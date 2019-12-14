/* eslint-disable no-undef */
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const flash = require("connect-flash");
const defaultErrorHandler = require("./server/middleware/errorHandler");
const authenticate = require("./server/middleware/authentication");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 7200000,
      httpOnly: true
    }
  })
);

app.set("views", __dirname + "/views");
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

//global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(express.static("public"));
// app.use(express.static(__dirname + "/public"));
app.use(fileUpload());
app.use(cookieParser());
app.use(authenticate.parseUser);
app.use(defaultErrorHandler);

const routes = require("./server/routes/index")(app);

// app.use('/', require('./server/routes/index'));
app.use("/users", require("./server/routes/users"));

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

module.exports = { app: app };
