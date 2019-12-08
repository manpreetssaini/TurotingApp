/* eslint-disable no-undef */

const { sendRequest, getStudentProfile } = require("./studentDashboard");
const {
  acceptRequest,
  rejectRequest,
  getTutorProfile,
  editProfile
} = require("./tutorDashboard");

const {
  login
} = require("./login");
const {
  register
} = require("./register");

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

  app.get("/register", register);
  app.post("/register", register);
  app.get("/login", login);
  app.post("/login", login);

  app.get("/", (req, res) => {
    res.render("landing");
  });

};
// comment
