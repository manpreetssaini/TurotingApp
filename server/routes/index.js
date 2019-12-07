const router = require("express").Router();
const {
  submitStudentEdit,
  editStudent,
  sendRequest,
  getStudentProfile
} = require("./studentDashboard");
const {
  submitEdit,
  editProfile,
  acceptRequest,
  rejectRequest,
  getTutorProfile
} = require("./tutorDashboard");

const { search } = require("./search");

module.exports = app => {
  app.get("/results", search);

  app.get("/studentdashboard/:id", getStudentProfile);
  app.post("/sendRequest", sendRequest);
  app.post("/editStudent", editStudent);
  app.post("/submitStudentEdit", submitStudentEdit);

  app.get("/tutordashboard/:id", getTutorProfile);
  app.post("/acceptRequest", acceptRequest);
  app.post("/rejectRequest", rejectRequest);
  app.post("/editProfile", editProfile);
  app.post("/submitEdit", submitEdit);

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
