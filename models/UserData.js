const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDataSchema = new Schema({
	userId: {type: Schema.Types.ObjectId, ref: 'User'},
	username: String,
	currentQuiz : {
		type: Schema.Types.ObjectId, ref: 'Quiz' 
	},
	previousQuizes: [{
		type: Schema.Types.ObjectId, ref: 'Quiz'
	}],
	mQuestionCorrect: {},
	mQuestionCount: {},
	dQuestionCorrect: {},
	dQuestionCount: {},
	aQuestionCorrect: {},
	aQuestionCount: {},
	sQuestionCorrect: {},
	sQuestionCount: {}
});

const UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;
