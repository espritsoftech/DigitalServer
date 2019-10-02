const passport = require("passport");

module.exports = app => {
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"]
        })
    );

    app.get(
        "/auth/google/callback",
        passport.authenticate("google"),
        (req, res) => {
            console.log("Logged In");
            res.redirect("/");
        }
    );

    app.get(
        "/auth/logout",
        (req, res) => {
            req.logout();
            console.log("Logged Out");
        }
    );

    app.get(
        "/auth/current_user",
        (req, res) => {
            console.log("User", req.user);
        }
    )
}