const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.render("landing");
});

routes.get("/register", (req, res) => {
  res.render("register");
});

routes.get("/login", (req, res) => {
  res.render("login");
});

routes.get("/register", (req, res) => {
  res.render("register");
});

routes.get("/results", (req, res) => {
  res.render("results");
});

routes.get("/search", (req, res) => {
  res.render("search");
});

routes.get("/home", (req, res) => {
  res.render("home");
});
module.exports = routes;
// comment
