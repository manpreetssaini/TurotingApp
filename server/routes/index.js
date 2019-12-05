const router = require("express").Router();
const { sendRequest, getStudentProfile } = require("./studentDashboard");
const {
  acceptRequest,
  rejectRequest,
  getTutorProfile,
  editProfile
} = require("./tutorDashboard");

module.exports = app => {
  app.get("/results", (req, res) => {
    res.render("results");
  });

  app.get("/search", (req, res) => {
    res.render("search");
  });

  app.get("/studentdashboard/:id", getStudentProfile);
  app.post("/sendRequest", sendRequest);

  app.get("/tutordashboard/:id", getTutorProfile);
  app.post("/acceptRequest", acceptRequest);
  app.post("/rejectRequest", rejectRequest);
  app.get("/editProfile", editProfile);

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
