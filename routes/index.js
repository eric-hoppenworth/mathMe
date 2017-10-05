module.exports = function (passport) {
	const path = require("path");
	const router = require('express').Router();
	const apiRoutes = require("./apiRoutes.js")(passport);
	const authRoutes = require("./authRoutes.js")(passport);
	// API Routes
	router.use("/api", apiRoutes);
	router.use("/auth", authRoutes);

	// If no API routes are hit, send the React app
	router.use(function(req, res) {
	  res.sendFile(path.join(__dirname, "../client/build/index.html"));
	});

	return router;
};