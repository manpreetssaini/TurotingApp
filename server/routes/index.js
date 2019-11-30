const router = require("express").Router();
const { sendRequest, getStudentProfile } = require("./studentDashboard");
const { getTutorProfile } = require("./tutorDashboard");

module.exports = app => {
  app.get("/results", (req, res) => {
    res.render("results");
  });

  app.get("/search", (req, res) => {
    res.render("search");
  });

  app.get("/studentdashboard", getStudentProfile);
  app.post("/sendRequest", sendRequest);
  app.get("/tutordashboard", getTutorProfile);

  app.get("/", (req, res) => {
    res.render("landing");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/register", (req, res) => {
    res.render("register");
  });

  app.post("/register", (req, res) => {
    res.status(200);
  });
};
// comment
