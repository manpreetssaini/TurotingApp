const connection = require("../../connection");

const express = require("express");
const Student = require("../db/student");
const Tutor = require("../db/tutor");
const router = express.Router();

// create an object from the class User in the file core/user.js
const student = new Student();
const tutor = new Tutor();

// Get the main page
router.get("/", (req, res) => {
  res.render("index");
});

// Get home page
router.get("/", (req, res, next) => {
  let user = req.session.user;

  if (user) {
    res.render("home", { opp: req.session.opp, name: user.username });
    return;
  }
  res.redirect("/");
  next();
});

router.get("/studentlogin", (req, res) => {
  res.render("studentlogin");
});

// Post Student login data
router.post("/studentlogin", (req, res, next) => {
  // The data sent from the user are stored in the req.body object.
  // call our login function and it will return the result(the user data).
  student.login(req.body.email, req.body.password, function(result) {
    if (result) {
      // Store the user data in a session.
      req.session.user = result;
      req.session.opp = 1;
      console.log(result);
      // redirect the user to the home page.
      res.redirect("/studentDashboard/" + result.student_id);
    } else {
      // if the login function returns null send this error message back to the user.
      req.flash("error", "You are not registered !!");
      res.redirect("studentlogin");
      next();
    }
  });
});

router.get("/studentregister", (req, res) => {
  res.render("studentregister");
});

// Post Student register data
router.post("/studentregister", (req, res) => {
  const {
    username,
    email,
    password,
    password2,
    first_name,
    last_name,
    location,
    DOB
  } = req.body;
  let errors = [];

  // check required fields
  if (!username || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // check passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match " });
  }

  //check pass length
  if (password.length < 6) {
    errors.push({ msg: "Password should be atleast 6 characters" });
  }

  if (errors.length > 0) {
    res.render("studentregister", {
      errors,
      username,
      email,
      password,
      password2
    });
  } else {
    // prepare an object containing all user inputs.
    let userInput = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      city: req.body.location,
      DOB: req.body.DOB
    };
    console.log(student);
    // call create function. to create a new user. if there is no error this function will return it's id.
    student.create(userInput, function(lastId) {
      // if the creation of the user goes well we should get an integer (id of the inserted user)
      if (lastId) {
        // Get the user data by it's id. and store it in a session.
        student.find(lastId, function(result) {
          req.session.user = result;
          req.session.opp = 0;
          req.flash("success_msg", "You are now registered");
          res.redirect("studentlogin");
        });
      } else {
        console.log("Error creating a new user ...");
      }
    });
  }
});

router.get("/studentlogout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/studentlogin");
});

//

// TUTOR LOGIN

router.get("/tutorlogin", (req, res) => {
  res.render("tutorlogin");
});

// Post Tutor login data
router.post("/tutorlogin", (req, res, next) => {
  // The data sent from the tutor are stored in the req.body object.
  // call our login function and it will return the result(the tutor data).
  tutor.login(req.body.email, req.body.password, function(result) {
    if (result) {
      // Store the tutor data in a session.
      req.session.tutor = result;
      req.session.opp = 1;
      const tutorIDQuery = "SELECT * FROM tutors WHERE email = ?;";
      connection.db.query(tutorIDQuery, req.body.email, (err, result) => {
        if (err) {
          throw err;
        }
        const tutorInfo = result.map(res => {
          return {
            tutor_id: res.tutor_id,
            email: res.email,
            user_name: res.user_name,
            city: res.city
          };
        });
        console.log(tutorInfo); // redirect the tutor to the home page.
        res.redirect("/tutordashboard/" + tutorInfo[0].tutor_id);
      });
    } else {
      // if the login function returns null send this error message back to the tutor.
      req.flash("error", "You are not registered !!");
      res.redirect("tutorlogin");
      next();
    }
  });
});

// TUTOR REGISTRATION

router.get("/tutorregister", (req, res) => {
  res.render("tutorregister");
});

// Post Tutor register data
router.post("/tutorregister", (req, res) => {
  const {
    username,
    email,
    password,
    password2,
    location,
    specialty,
    DOB,
    first_name,
    last_name
  } = req.body;
  let errors = [];

  // check required fields
  if (!username || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // check passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match " });
  }

  //check pass length
  if (password.length < 6) {
    errors.push({ msg: "Password should be atleast 6 characters" });
  }

  if (errors.length > 0) {
    res.render("tutorregister", {
      errors,
      username,
      email,
      password,
      password2
    });
  } else {
    // prepare an object containing all user inputs.
    let userInput = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      city: req.body.location,
      dob: req.body.DOB,
      speciality: req.body.specialty,
      first_name: req.body.first_name,
      last_name: req.body.last_name
    };
    console.log(tutor);
    // call create function. to create a new user. if there is no error this function will return it's id.
    tutor.create(userInput, function(lastId) {
      // if the creation of the user goes well we should get an integer (id of the inserted user)
      if (lastId) {
        // Get the user data by it's id. and store it in a session.
        tutor.find(lastId, function(result) {
          req.session.user = result;
          req.session.opp = 0;
          req.flash("success_msg", "You are now registered");
          res.redirect("tutorlogin");
        });
      } else {
        console.log("Error creating a new user ...");
      }
    });
  }
});

router.get("/tutorlogout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/tutorlogin");
});

module.exports = router;
