const connection = require("../../connection");

module.exports = {
  verifyIdentity: (req, res, next) => {
    let identity;
    let role;
    if (req.session.user.tutor_id) {
      identity = req.session.user.tutor_id;
      role = "tutor";
      console.log(req.path);
      console.log(identity);
      console.log(role);
    } else {
      identity = req.session.user.student_id;
      role = "student";
      console.log(req.path);
      console.log(identity);
      console.log(role);
    }
    if (
      (req.path === "/tutordashboard/" + identity && role === "tutor") ||
      (req.path === "/studentDashboard/" + identity && role === "student")
    ) {
      next();
    } else {
      res.redirect("/");
    }
  },

  tutorlogout: (req, res) => {
    req.session.user = null;
    // req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/users/tutorlogin");
  },

  studentlogout: (req, res) => {
    req.session.user = null;
    // req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/users/studentlogin");
  }
};
