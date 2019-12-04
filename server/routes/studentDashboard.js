const connection = require("../../connection");

module.exports = {
  sendRequest: (req, res) => {
    let start_time = new Date(req.body.date)
      .toJSON()
      .slice(0, 19)
      .replace("T", " ");
    const query =
      "INSERT INTO student_request (student_id, subject, topic, description, start_time, end_time) VALUES (?, ?,?,?,?,DATE_ADD(?, INTERVAL 30 MINUTE));";

    const values = [
      req.body.studentID,
      req.body.subject,
      req.body.topic,
      req.body.description,
      String(start_time),
      String(start_time)
    ];
    console.log(values);

    connection.db.query(query, values, (err, result) => {
      if (err) {
        throw err;
      }
      res.redirect("back");
    });
  },

  getStudentProfile: (req, res) => {
    let student_id = req.params.id;
    const query = "SELECT * FROM students WHERE student_id =? LIMIT 1";
    connection.db.query(query, student_id, (err, result) => {
      if (err) {
        throw err;
      }

      let student = result;

      let full_name = student[0].first_name + " " + student[0].last_name;

      const upcomingQuery =
        "SELECT * FROM student_request WHERE student_id=" +
        student[0].student_id +
        " ORDER BY request_id DESC LIMIT 3";
      connection.db.query(upcomingQuery, (err, result) => {
        if (err) {
          throw err;
        }
        const upcomingSessions = result.map(res => {
          return {
            subject: res.subject,
            topic: res.topic,
            description: res.description,
            start_time: res.start_time,
            end_time: res.end_time
          };
        });
        console.log(upcomingSessions);
        res.render("studentDashboard.ejs", {
          student,
          full_name,
          upcomingSessions
        });
      });
    });
  }
};
