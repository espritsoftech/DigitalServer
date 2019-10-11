const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const LocalStrategy = require('passport-local');

const User = mongoose.model("User");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  {
		usernameField: 'email',
		passwordField: 'password'
	},
  function(email, password, done) {
    console.log("IN")
    User.getUserByUsername(email, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }
      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
     	if(isMatch){
     	  return done(null, user);
     	} else {
     	  return done(null, false, {message: 'Invalid password'});
     	}
     });
   });
  }
));
  
// passport.use(
//     new GoogleStrategy({
//             clientID: keys.googleClientID,
//             clientSecret: keys.googleClientSecret,
//             callbackURL: "/auth/google/callback",
//             proxy: true
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             console.log("Gmail Profile", profile);
//             const existingUser = await User.findOne({
//                 googleId: profile.id
//             });
//             if (existingUser) {
//                 return done(null, existingUser)
//             }
//             const user = await new User({
//                 googleId: profile.id
//             }).save();
//             done(null, user);
//         }
//     )
// );