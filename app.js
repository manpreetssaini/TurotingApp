const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const session = require("express-session");
const app = express();


const db = mysql.createConnection({
  // Replace with user-appropriate values
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

db.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('Connected to database');
});
global.db =db;

const port = 3000;
app.set("port", process.env.port || port);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(fileUpload());

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
  