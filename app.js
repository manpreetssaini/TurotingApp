/* eslint-disable no-undef */
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const fileUpload = require("express-fileupload");
const defaultErrorHandler = require("./server/middleware/errorHandler");
const authenticate = require("./server/middleware/authentication");
const cookieParser = require('cookie-parser');
require("dotenv").config();
const pageRouter = require('./server/routes/login-register');

const app = express();

const port = 4000;


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 7200000,
    httpOnly: true,
  },
}));


app.set('port', process.env.port || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(fileUpload());
app.use(cookieParser());
app.use(authenticate.parseUser);
app.use(defaultErrorHandler);


app.use('/', pageRouter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = { app: app };
