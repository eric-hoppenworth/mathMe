var router = require("express").Router();
var path = require("path");


// module.exports = function (router, passport) {
module.exports = function (router) {

	router.get("/",function(req,res){
		res.json( createQuiz(5,3,"+") );
	});

	router.post("/getQuiz",function(req,res){
		var options = req.body;
		res.json( createQuiz(options.n, options.d, options.o) );
	})

	function createQuiz(numQ = 10, diff = 1, opp = "+"){
		var myQuiz = {
			questions: [],
			currQ: 0
		}
		for (var i = 0; i < numQ; i++){
			var myQ = {}
			myQ.left 	= Math.floor(Math.random() * Math.pow(10,diff) + 1);
			myQ.right 	= Math.floor(Math.random() * Math.pow(10,diff) + 1);
			//the larger number should always be on the left
			if(myQ.right > myQ.left){
				let temp = myQ.left;
				myQ.left = myQ.right;
				myQ.right = temp;
			}
			myQ.opp = opp;
			myQ.solution = getSolution(myQ.left,myQ.right,myQ.opp);
			//if it was a division problem, I need to swap around the opperands
			if(opp === "/"){
				let temp = myQ.solution;
				myQ.solution = myQ.left;
				myQ.left = temp;
			}
			myQuiz.questions.push(myQ);
		}//end for
		return myQuiz;
	}

	function getSolution(left,right,opp){
		var answer = 0;
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
}

// $$ \frac{\begin{array}[b]{r}\left. 15 \right. \\ \times \left. 25 \right. \end{array} }{ \left.  \right.} $$