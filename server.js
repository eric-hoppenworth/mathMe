var express 	= require('express');
var app 		= express();
// var passport 	= require('passport');
// var session 	= require('express-session');
var bodyParser 	= require('body-parser');
var path 		= require("path");

var port = process.env.PORT || 8080;

//Models

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//  // For Passport
// app.use(session({ secret: 'team EMS',resave: true, saveUninitialized:true})); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// require('./config/passport/passport.js')(passport,models.User);

//make static folder
app.use('/assets', express.static(path.join(__dirname, '/public/assets')));

//Routes
// var routes = require("./Controllers/routes.js")(app, passport);
var routes = require("./controllers/routes.js")(app);

//Sync Database
app.listen(port, function(err){
    if(!err){
    	console.log("Site is live on " + port);
    }
     else {
 		console.log(err);
 	}
});