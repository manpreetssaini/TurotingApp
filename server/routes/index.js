const router = require("express").Router();
const { getStudentProfile } = require("./studentDashboard");

module.exports = app => {
  app.get("/results", (req, res) => {
    res.render("results");
  });

  app.get("/search", (req, res) => {
    res.render("search");
  });

  app.get("/dashboard", getStudentProfile);

  app.get("/landing", (req, res) => {
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
