const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const fileUpload = require('express-fileupload');
const defaultErrorHandler = require('./server/middleware/errorHandler');
const authenticate = require('./server/middleware/authentication');
require('dotenv').config();
require('./passport-config')(passport);
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const faker = require("faker");
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');

const app = express();

const port = 3000;


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


app.set("port", process.env.port || port);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(fileUpload());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser);
app.use(authenticate.parseUser);
app.use(defaultErrorHandler);

require('./server/routes/login-register')(app, passport);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;