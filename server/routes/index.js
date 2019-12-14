const express = require("express");
const router = express.Router();
const {
  submitTutorReview,
  tutorRating,
  submitStudentEdit,
  editStudent,
  sendRequest,
  getStudentProfile
} = require("./studentDashboard");
const {
  completeTutorInfo,
  studentRating,
  submitStudentReview,
  submitEdit,
  editProfile,
  acceptRequest,
  rejectRequest,
  getTutorProfile
} = require("./tutorDashboard");

const {
  filter,
  search,
  individualRequest,
  submitIndividualRequest
} = require("./search");

const { verifyIdentity, tutorlogout, studentlogout } = require("./helpers");

module.exports = app => {
  app.get("/tutorlogout", tutorlogout);
  app.get("/studentlogout", studentlogout);

  app.get("/results/:id", search);
  app.post("/filter/:id", filter);
  app.get("/individualRequest/:tutorid/:studentid/:subject", individualRequest);
  app.post("/submitIndividualRequest", submitIndividualRequest);

  app.get("/studentdashboard/:id/", verifyIdentity, getStudentProfile);

  app.post("/sendRequest", sendRequest);
  app.post("/editStudent", editStudent);
  app.post("/submitStudentEdit", submitStudentEdit);
  app.get("/tutorRating/:id/:user_name", tutorRating);
  app.post("/submitTutorReview", submitTutorReview);
  app.get("/tutordashboard/:id", verifyIdentity, getTutorProfile);

  app.post("/acceptRequest", acceptRequest);
  app.post("/rejectRequest", rejectRequest);
  app.post("/editProfile", editProfile);
  app.post("/submitEdit", submitEdit);
  app.get("/studentRating/:id/:user_name", studentRating);
  app.post("/submitStudentReview", submitStudentReview);

  app.get("/completeTutorInfo/:id", completeTutorInfo);

  app.get("/", (req, res) => {
    res.render("welcome.ejs");
  });

  // app.get("/login", (req, res) => {
  //   res.render("login");
  // });

  // app.get("/register", (req, res) => {
  //   res.render("register");
  // });
};
