const path = require("path");
const quizController = require("../controllers/quizController.js");
// module.exports = function (router, passport) {
module.exports = function (passport) {
	const router = require("express").Router();

	router.post("/getQuiz",quizController.createQuiz);
	router.post("/completeQuiz",quizController.markComplete)


	return router;
}

// $$ \frac{\begin{array}[b]{r}\left. 15 \right. \\ \times \left. 25 \right. \end{array} }{ \left.  \right.} $$