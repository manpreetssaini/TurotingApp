const connection = require("../../connection");

module.exports = {
  acceptRequest: (req, res) => {
    let accept = req.body.accept;
    console.log(req.body.accept);
    console.log(req.body.value);
  },

  rejectRequest: (req, res) => {
    console.log("Request Rejected");
  },

  getTutorProfile: (req, res) => {
    let tutor_id = req.params.id;
    const query = "SELECT * FROM tutors WHERE tutor_id = ?";
    connection.db.query(query, tutor_id, (err, result) => {
      if (err) {
        throw err;
      }
      let tutor = result;

      let full_name = tutor[0].first_name + " " + tutor[0].last_name;
      const upcomingQuery =
        "SELECT * FROM student_request WHERE subject='" +
        tutor[0].speciality +
        "'" +
        "AND  (tutor_id IS NULL OR ?) AND start_time >= NOW() ORDER BY start_time DESC LIMIT 3 ";
      connection.db.query(upcomingQuery, tutor[0].tutor_id, (err, result) => {
        if (err) {
          throw err;
        }
        const requestedSessions = result.map(res => {
          return {
            subject: res.subject,
            topic: res.topic,
            description: res.description,
            start_time: res.start_time,
            end_time: res.end_time,
            request_id: res.request_id
          };
        });
        res.render("tutorDashboard.ejs", {
          tutor,
          full_name,
          requestedSessions
        });
      });
    });
  }
};
