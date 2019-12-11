/* eslint-disable no-undef */
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const defaultErrorHandler = require("./server/middleware/errorHandler");
const authenticate = require("./server/middleware/authentication");
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');

require("dotenv").config();


const app = express();

const PORT = process.env.PORT || 4000;


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


app.set('views', __dirname + '/views');
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(fileUpload());
app.use(cookieParser());
app.use(authenticate.parseUser);
app.use(defaultErrorHandler);

app.use('/', require('./server/routes/routes'));
app.use('/users', require('./server/routes/users'));



app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

module.exports = { app: app };
