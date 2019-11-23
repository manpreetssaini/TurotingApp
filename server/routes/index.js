const router = require("express").Router();

module.exports = app => {
  app.get("/results", (req, res) => {
    res.render("results");
  });

  app.get("/search", (req, res) => {
    res.render("search");
  });

  app.get("/home", (req, res) => {
    res.render("student_home");
  });

  app.get("/", (req, res) => {
    res.render("landing");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/register", (req, res) => {
    res.render("register");
  });

  app.get("/random", (req, res) => {
    res.render("random");
  });

  app.post("/register", (req, res) => {
    res.status(200);
  });
};
// comment
