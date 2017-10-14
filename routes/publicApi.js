module.exports = function(){
	const path = require("path");
	const router = require("express").Router();

	router.get("/quiz",function(req,res){
		let numQ = parseInt(req.query.n);
		let diff = parseInt(req.query.d);
		let opp = req.query.o;

		if(!(opp === "add" || opp === "subtract" || opp === "multiply" || opp === "divide")){ 
			res.send({status: 400, message:"Please use the word for the opperation you want: 'add' 'subtract' 'multiply' or 'divide' ",postScript:"be sure that you do NOT include quotes ('') in your query"})
		}
		if(isNaN(numQ) || isNaN(diff)){
			res.send({status:400, message: "Be sure to use only numbers for parameters 'n' and 'd'",postScript:"As a note, the maximum number of questions is 50 and the maximum difficulty is 8(for multiplication and division) or 15 (for addition and subtraction)"})
		}
		switch(opp){
			case "add":
				opp = "+";
				break;
			case "subtract":
				opp = '-';
				break;
			case "multiply":
				opp = '*';
				break;
			case "divide":
				opp = '/';
				break;
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
		const myQuiz = {
			questions: [],
			difficulty: diff,
			opp: opp
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
			myQuiz.questions.push(myQ);
		}

		const latex = getLatex(myQuiz);

		res.json({quiz:myQuiz,latex});

	});
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
	const getLatex = function(quiz){
		const latex = [];
		for (let i = 0; i < quiz.questions.length;i++){
			let formulaString = "";
			if(quiz.opp === "/"){
				formulaString = String.raw`$$ ${quiz.questions[i].right} \overline{\smash{)} ${quiz.questions[i].left} } $$`
			} else {
				let oppString = "";
				switch(quiz.opp){
				case "+":
					oppString += " + ";
					break;
				case "-":
					oppString += " - ";
					break;
				case "*":
					oppString += String.raw` \times `;
					break;
				default:
					break;
				}
				formulaString = String.raw`$$ \frac{\begin{array}[b]{r}\left. ${quiz.questions[i].left} \right. \\ ${oppString} \left. ${quiz.questions[i].right} \right. \end{array} }{ \left.  \right.} $$`
			}

			latex.push(formulaString);
		}
		return latex;
	};

	return router;
}