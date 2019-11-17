const express = require ('express');
const session = require('express-session');
const routes = require('./server/routes');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const fileUpload = require('express-fileupload');
const defaultErrorHandler = require('./server/middleware/errorHandler');
const authenticate = require('./server/middleware/authentication');
require('dotenv').config();

const app = express();


const port = 3000;

const db = mysql.createConnection({
  // Replace with user-appropriate values
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'tutors_db'
});

db.connect((err) => {
  if(!err) {
    console.log("Connected");
  }
  else {
    throw(err)
  }
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure:false,
        maxAge: 7200000,
        httpOnly: true,
    },
}));


app.set("port", process.env.port || port);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(fileUpload());
app.use(authenticate.parseUser);
app.use(defaultErrorHandler);
app.use(routes);

app.get("/", (req, res) => {
    res.render("landing");
  });
  
  app.get("/register", (req, res) => {
    res.render("register");
  });
  
  app.get("/login", (req, res) => {
    res.render("login");
  });
  
  app.get("/register", (req, res) => {
    res.render("register");
  });
  
  app.get("/results", (req, res) => {
    res.render("results");
  });
  
  app.get("/search", (req, res) => {
    res.render("search");
  });
  
  app.get("/home", (req, res) => {
    res.render("home");
  });
  
  app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
  });
  