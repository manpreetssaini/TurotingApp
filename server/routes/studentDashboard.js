const connection = require("../../connection");

module.exports = {
  getStudentProfile: (req, res) => {
    const query = "SELECT * FROM students LIMIT 1";
    connection.db.query(query, (err, result) => {
      if (err) {
        throw err;
      }

      let student = result;

      let full_name = student[0].first_name + " " + student[0].last_name;

      //   let upcomingQuery = "SELECT * ";
      res.render("studentDashboard.ejs", { student, full_name });
    });
  }
};
