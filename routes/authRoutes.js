const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const LocalStrategy = require('passport-local');

module.exports = app => {
	app.post("/register", function(req, res) {
		var newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});

		User.createUser(newUser, function(err, user) {
			if (err) throw err;
			res.send(user).end();
		});
	});

	// Endpoint to login
	app.post("/login", passport.authenticate("local"), function(req, res) {
		res.send(req.user);
	});

	
	// Endpoint to get current user
	app.get("/user", function(req, res) {
		console.log("User",req.user)
		res.send(req.user);
	});

	// Endpoint to logout
	app.get("/logout", function(req, res) {
		req.logout();
		res.send(null);
	});
};
