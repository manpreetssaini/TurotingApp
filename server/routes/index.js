/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();


const { sendRequest,
  getStudentProfile
} = require("./studentDashboard");
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
};

router.get('/', (req, res) => {
  res.render('Welcome');
});

// Dashboard
router.get('/studentdashboard', (req, res) =>
  res.render('dashboard', {
    // user: req.user
  })
);

router.get('/tutordashboard', (req, res) =>
  res.render('dashboard', {
    // user: req.user
  })
);


module.exports = router;
