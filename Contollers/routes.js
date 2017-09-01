function createQuiz(numQ = 10, diff = 1, opp = "+"){
	var myQuiz = {
		questions: [],
		currQ: 0
	}
	for (var i = 0; i < numQ; i++){
		var myQ = {}
		myQ.left 	= Math.floor(Math.random() * Math.pow(10,diff));
		myQ.right 	= Math.floor(Math.random() * Math.pow(10,diff));
		//the larger number should always be on the left
		if(myQ.right > myQ.left){
			let temp = myQ.left;
			myQ.left = myQ.right;
			myQ.right = temp;
		}
		myQ.opp = opp;
		myQ.solution = getSolution(myQ.left,myQ.right,myQ.opp);
		myQuiz.questions.push(myQ);
	}//end for
	console.log(myQuiz);
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
			answer = Math.floor(left / right);
			break;
	}//end switch
	return answer;
}

createQuiz(5,3,"+");