const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
	questions: [{
		left: Number,
		right: Number,
		solution: Number,
		response: Number
	}],
	currentQuestion: Number,
	opp: String,
	isCurrent: Boolean,
	difficulty: Number,
	numberCorrect: Number,
	userId: {type: Schema.Types.ObjectId, ref: 'UserData'}
});

quizSchema.methods.getLatex = function(){
	const latex = [];
	for (let i = 0; i < this.questions.length;i++){
		let formulaString = "";
		if(this.opp === "/"){
			formulaString = String.raw`$$ ${this.questions[i].right} \overline{\smash{)} ${this.questions[i].left} } $$`
		} else {
			let oppString = "";
			switch(this.opp){
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
			formulaString = String.raw`$$ \frac{\begin{array}[b]{r}\left. ${this.questions[i].left} \right. \\ ${oppString} \left. ${this.questions[i].right} \right. \end{array} }{ \left.  \right.} $$`
		}

		latex.push(formulaString);
	}
	return latex;
};

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
