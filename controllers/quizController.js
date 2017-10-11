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

function removeCurrentQuiz(userId){
	models.Quiz
		.find({userId: userID, isCurrent: true})
		.then((data)=>{
			return data;
		})
}

module.exports = {
	createQuiz: function(req, res){
		const numQ = req.body.n;
		const diff = req.body.d;
		const opp = req.body.o;
		const id = req.user ? req.user._id : mongoose.Types.ObjectId("59d5a41b770d2811a89ffa64"); //default value for testing with postman


		const myQuiz = {
			questions: [],
			currentQuestion: 0,
			difficulty: diff,
			opp: opp,
			userId: id,
			isCurrent: true
		};

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
				console.log(result.getLatex(0));
				console.log(result.getLatex(1));
				res.send(result);
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
			doc.update({numberCorrect: total, isCurrent:false},function(err, data){
				res.send({numberCorrect: total, numberQuestions: doc.questions.length});
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
				res.send(result);
			});
		});
	},
	getCurrent: function(req,res){
		//untested
		const id = req.user._id;
		models.Quiz.findOne({userId: id, isCurrent: true}).then(function(err, doc){
			res.send(doc);
		});
	}

}