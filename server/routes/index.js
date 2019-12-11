/* eslint-disable no-undef */


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

