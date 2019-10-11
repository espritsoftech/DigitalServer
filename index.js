const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const keys = require("./config/keys");
require('./models/user')



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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }));

app.use(passport.initialize());
app.use(passport.session());
require("./routes/authRoutes")(app);
require("./services/passport");

app.get("/", (req, res) => {
    console.log("Testing app");
    res.send("Testing Connected new");
});


const PORT = 3000;
// app.listen(process.env.PORT || PORT);
app.listen(3000);