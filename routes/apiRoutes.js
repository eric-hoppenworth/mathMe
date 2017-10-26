const path = require("path");
const quizController = require("../controllers/quizController.js");

module.exports = function (passport) {
	const router = require("express").Router();


	router.post("/getNewQuiz",quizController.createQuiz);
	router.post("/completeQuiz",quizController.markComplete);
	router.post("/updateQuestion",quizController.updateQuestion);
	router.get("/currentQuiz",quizController.getCurrent);
	router.post("/getScores",quizController.getScores);
	router.get("/getPrevious",quizController.getPrevious);
	router.post("/getPreviousOpp",quizController.getPreviousOpp);

	return router;
}