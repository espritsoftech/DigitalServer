const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const keys = require("./config/keys");
require("./models/Users");
require("./services/passport");

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
}).then(
    () => console.log("Connected to DB")
).catch(
    (err) => console.error(err)
);

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    console.log("Testing app");
    res.send("Hello Testing Connected");
});

require("./routes/authRoutes")(app);

const PORT = 5000;
app.listen(process.env.PORT || PORT);