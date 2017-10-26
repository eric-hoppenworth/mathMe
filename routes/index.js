module.exports = function (passport) {
	const path = require("path");
	const router = require('express').Router();
	const apiRoutes = require("./apiRoutes.js")(passport);
	const authRoutes = require("./authRoutes.js")(passport);
	const publicRoutes = require("./publicApi.js")();
	// API Routes
	router.use("/api",isLoggedIn, apiRoutes);
	router.use("/auth", authRoutes);
	//this is for the public quiz generator API
	router.use("/public/api", publicRoutes);

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
			return next();

		res.send({status:403,message:"You must be logged in to do this action"});
	}
	// If no API routes are hit, send the React app
	router.use(function(req, res) {
	  res.sendFile(path.join(__dirname, "../client/build/index.html"));
	});

	return router;
};

