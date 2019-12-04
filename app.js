const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');
const defaultErrorHandler = require('./server/middleware/errorHandler');
const authenticate = require('./server/middleware/authentication');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const loginReg = require('./server/routes/login-register');

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


app.set("port", process.env.port || port);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(fileUpload());
app.use(cookieParser());
app.use(authenticate.parseUser);
app.use(defaultErrorHandler);


//routes
app.use('/', loginReg);
app.get('/')

// errors => page not found 404
app.use((req, res, next) => {
  let err = new Error('Page not found');
  err.status = 404;
  next(err);
});

// handling error(send them to the client)
app.use((req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});


app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;