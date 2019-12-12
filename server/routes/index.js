/* eslint-disable no-undef */
const express = require('express');
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

module.exports = app => {
  app.get("/results/:id", search);
  app.post("/filter/:id", filter);
  app.get("/individualRequest/:tutorid/:studentid/:subject", individualRequest);
  app.post("/submitIndividualRequest", submitIndividualRequest);

  app.get("/studentdashboard/:id/", getStudentProfile);
  app.post("/sendRequest", sendRequest);
  app.post("/editStudent", editStudent);
  app.post("/submitStudentEdit", submitStudentEdit);
  app.get("/tutorRating/:id/:user_name", tutorRating);
  app.post("/submitTutorReview", submitTutorReview);

  app.get("/tutordashboard/:id", getTutorProfile);
  app.post("/acceptRequest", acceptRequest);
  app.post("/rejectRequest", rejectRequest);
  app.post("/editProfile", editProfile);
  app.post("/submitEdit", submitEdit);

  // app.get("/", (req, res) => {
  //   res.render("landing");
  // });

  // app.get("/login", (req, res) => {
  //   res.render("login");
  // });

  // app.get("/register", (req, res) => {
  //   res.render("register");
  // });
};

router.get('/', (req, res) => {
  res.render('Welcome');
});

// Dashboard
router.get('/studentdashboard', (req, res) =>
  res.render('studentDashboard', {
    // user: req.user
  })
);

router.get('/tutordashboard', (req, res) =>
  res.render('tutorDashboard', {
    // user: req.user
  })
);


module.exports = router;
