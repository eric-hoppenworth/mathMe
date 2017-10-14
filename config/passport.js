var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport, user) {

    var User = user;
    var LocalStrategy = require('passport-local').Strategy;


    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });


    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}).exec(function (err,user) {
            if(err) return err;
            if (user) {
                done(null, user);
            } else {
                done(user.errors, null);
            }
        });

    });


    passport.use('local-signup', new LocalStrategy(

        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true 
        },

        function (req, email, password, done) {

            //hash password 
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({email: email}).exec(function (err,user) {
                if (user) {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else {
                    var userPassword = generateHash(password);
                    var data = {
                        email: email,
                        password: userPassword,
                        username: req.body.username
                    };
                    var newUser = new User(data);

                    newUser.save(function(err,result){
                        if (!err){
                            return done(null, result);
                        } else {
                            return done(null, false);
                        }
                    });
                }

            });

        }

    ));

    //Local signin
    passport.use('local-signin', new LocalStrategy(

        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true 
        },

        function (req, email, password, done) {

            var User = user;

            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }

            User.findOne({email: email}).exec(function (err,user) {
                if (!user) {
                    return done(null, false, {
                        message: 'Email does not exist'
                    });
                }

                if (!isValidPassword(user.password, password)) {

                    return done(null, false, {
                        message: 'Incorrect password.'
                    });

                }

                var userinfo = user;

                return done(null, userinfo);

            }).catch(function (err) {

                console.log("Error:", err);

                return done(null, false, {
                    message: 'Login error'
                });
           
            });
        }
    ));

}