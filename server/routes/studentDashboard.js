const connection = require("../../connection");

module.exports = {
  submitTutorReview: (req, res) => {
    let submitReviewQuery = "";
  },

  tutorRating: (req, res) => {
    let session_id = req.params.id;
    let user_name = req.params.user_name;
    res.render("tutorRating.ejs", { session_id, user_name });
  },

  submitStudentEdit: (req, res) => {
    const updateQuery =
      "UPDATE students SET `first_name`= ?, `last_name` = ?, `city`=? WHERE (`student_id` = ?);";

    connection.db.query(
      updateQuery,
      [
        req.body.first_name,
        req.body.last_name,
        req.body.location,
        req.body.studentID
      ],
      (err, result) => {
        console.log(updateQuery);
        if (err) {
          throw err;
        }
        res.redirect("studentDashboard/" + req.body.studentID);
      }
    );
  },

  editStudent: (req, res) => {
    let student_id = req.body.student_id;
    console.log(student_id);

    const editQuery = "SELECT * FROM students WHERE student_id = ?";

    connection.db.query(editQuery, [student_id], (err, result) => {
      if (err) {
        throw err;
      }
      let student = result;
      let full_name = student[0].first_name + " " + student[0].last_name;
      res.render("editStudent", { student_id, full_name, student });
    });
  },

  sendRequest: (req, res) => {
    let start_time = new Date(req.body.date)
      .toJSON()
      .slice(0, 19)
      .replace("T", " ");
    const query =
      "INSERT INTO student_request (student_id, subject, city, topic, description, start_time, end_time) VALUES (?, ?, ?,?,?,?,DATE_ADD(?, INTERVAL 30 MINUTE));";

    const values = [
      req.body.studentID,
      req.body.subject,
      req.body.location,
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
        " AND start_time >= NOW() ORDER BY accepted ASC, request_id DESC";
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
            end_time: res.end_time,
            accepted: res.accepted
          };
        });

        const historyQuery =
          "SELECT * FROM student_request LEFT JOIN tutors ON student_request.tutor_id = tutors.tutor_id LEFT JOIN tutor_rating ON student_request.request_id = tutor_rating.session_id WHERE student_id = ? AND student_request.tutor_id IS NOT NULL AND start_time < NOW();";
        connection.db.query(
          historyQuery,
          [student[0].student_id],
          (err, result) => {
            if (err) {
              throw err;
            }
            const pastSessions = result.map(res => {
              return {
                name: res.user_name,
                session_id: res.request_id,
                topic: res.topic,
                date: res.start_time,
                rating: res.rating,
                tutor_id: res.tutor_id
              };
            });
            console.log(pastSessions[0].tutor_id);
            res.render("studentDashboard.ejs", {
              student,
              full_name,
              upcomingSessions,
              pastSessions
            });
          }
        );
      });
    });
  }
};
