const models = require("../models");
const mongoose = require("mongoose");


function getSolution(left,right,opp){
	let answer = 0;
	switch (opp) {
		case "+":
			answer = left + right;
			break;
		case "-":
			answer = left - right;
			break;
		case "*":
			answer = left * right;
			break;
		case "/":
			//default to integer division
			answer = left * right;
			break;
	}//end switch
	return answer;
}

module.exports = {
	createQuiz: function(req, res){
		let numQ = req.body.n;
		let diff = req.body.d;
		let opp = req.body.o;
		const id = req.user ? req.user._id : mongoose.Types.ObjectId("59d5a41b770d2811a89ffa64"); //default value for testing with postman


		const myQuiz = {
			questions: [],
			currentQuestion: 0,
			difficulty: diff,
			opp: opp,
			userId: id,
			isCurrent: true
		};
		//little bit of validation
		if(!(opp === "+" || opp === "-" || opp === "*" || opp === "/")){ 
			res.json({status: 400, message:"Please use only the arithmetic opperators: '+' '-' '*' or '/' ",postScript:"be sure that you do NOT include quotes ('') in your query"})
		}
		if(isNaN(numQ) || isNaN(diff)){
			res.json({status:400, message: "Be sure to use only numbers for parameters 'n' and 'd'",postScript:"As a note, the maximum number of questions is 50 and the maximum difficulty is 8(for multiplication and division) or 15 (for addition and subtraction)"})
		}
		//maximum question count is 50
		if(numQ > 50){
			numQ = 50;
		}
		//max difficulty is 8 for mult and division, 15 for others(will multiplication overflow?)
		if(diff > 8 && opp === "/"){
			diff = 8;
		} else if(diff > 8 && opp === "*"){
			diff = 8;
		} else if(diff > 15){
			diff = 15;
		} 

		for (let i = 0; i < numQ; i++){
			const myQ = {};
			myQ.left 	= Math.floor(Math.random() * Math.pow(10,diff) + 1);
			myQ.right 	= Math.floor(Math.random() * Math.pow(10,diff) + 1);
			//the larger number should always be on the left
			if(myQ.right > myQ.left){
				let temp = myQ.left;
				myQ.left = myQ.right;
				myQ.right = temp;
			}
			myQ.solution = getSolution(myQ.left,myQ.right,opp);
			//if it was a division problem, I need to swap around the opperands
			if(opp === "/"){
				let temp = myQ.solution;
				myQ.solution = myQ.left;
				myQ.left = temp;
			}
			myQ.response = null;
			myQuiz.questions.push(myQ);
		}

		const newQuiz = new models.Quiz(myQuiz);

		models.Quiz.findOneAndRemove({userId: id, isCurrent: true},(err,deletedDoc)=>{
			if(err) return err;
			newQuiz.save(function(err,result){
				if(err){
					return err;
				}
				const latex = result.getLatex();
				res.send({doc:result,latex});
			});
		});
	},
	markComplete: function(req,res){
		//update the current quiz after it is finished.
		//returns the results for that quiz
		const id = req.body.quizId;
		models.Quiz.findById(id,function(err,doc){
			let total = 0;
			for(let i = 0; i < doc.questions.length; i++){
				if(doc.questions[i].solution === doc.questions[i].response){
					total ++;
				}
			}
			doc.numberCorrect= total;
			doc.isCurrent = false;

			doc.save(function(err, updatedDoc){
				if(err){return err;	}
				const latex = updatedDoc.getLatex();
				res.send({doc: updatedDoc, latex});
			});
		});
	},
	updateQuestion: function(req,res){
		//updates a questions 'response' when it is answered
		//also moves to the next question
		const response = req.body.response;
		const id = req.body.quizId;
		models.Quiz.findById(id,function(err,doc){
			doc.questions[doc.currentQuestion].response = response;
			doc.currentQuestion++;
			doc.save(function(err, result){
				const latex = result.getLatex();
				res.send({doc:result,latex});
			});
		});
	},
	getCurrent: function(req,res){
		const id = req.user._id;

		models.Quiz.findOne({userId: id, isCurrent: true}).then(function(doc){
			const latex = doc.getLatex();
			res.send({doc,latex});
		}).catch(function(err){
			if(err) return err;
		});
	},
	getScores: function(req,res){
		const id = req.user ? req.user._id : mongoose.Types.ObjectId("59d5a41b770d2811a89ffa64");
		const results = {
			"+": {
				correct: 0,
				total: 0
			},
			"-": {
				correct: 0,
				total: 0
			},
			"*": {
				correct: 0,
				total: 0
			},
			"/": {
				correct: 0,
				total: 0
			}
		}

		models.Quiz.find({userId: id, isCurrent: false}).then(function(data){
			for(let i = 0 ; i <data.length; i++){
				const quiz = data[i];
				results[quiz.opp].correct += quiz.numberCorrect;
				results[quiz.opp].total += quiz.questions.length;
			}
			res.send(results);
		}).catch(function(err){
			if(err) return err;
		})
	},
	getPrevious: function(req,res){
		const id = req.user ? req.user._id : mongoose.Types.ObjectId("59d5a41b770d2811a89ffa64");
		const totalQuizez = 5;

		models.Quiz.find({userId: id, isCurrent:false}).sort({_id: -1}).limit(totalQuizez).then(function(data){
			//get the latex for these too?
			const latex = [];
			for (let i = 0; i <data.length;i++){
				latex.push(data[i].getLatex())
			}
			res.send({doc:data,latex});
		});
	},
	getPreviousOpp: function(req,res){
		//collects all quizes of a specific opperation
		const id = req.user ? req.user._id : mongoose.Types.ObjectId("59d5a41b770d2811a89ffa64");
		const opp = req.body.opp;
		const totalQuizez = 5;

		models.Quiz.find({userId: id, isCurrent:false, opp: opp}).sort({_id:-1}).limit(totalQuizez).then(function(data){
			//get the latex too
			const latex = [];
			for (let i = 0; i <data.length;i++){
				latex.push(data[i].getLatex())
			}
			res.send({doc:data,latex});
		});
	}

}