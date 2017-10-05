const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
	questions: [{
		left: Number,
		right: Number,
		opp: String,
		solution: Number,
		response: Number
	}],
	currentQuestion: Number,
	userDataId: {type: Schema.Types.ObjectId, ref: 'UserData'}
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
