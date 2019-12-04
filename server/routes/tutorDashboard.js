const connection = require("../../connection");

module.exports = {
  editProfile: (req, res) => {
    res.render("edit-profile.ejs");
  },

  acceptRequest: (req, res) => {
    let accept = req.body.accept;
    let tutor_id = req.body.tutorID;
    // console.log(accept);
    console.log(tutor_id);
    const query =
      "UPDATE `student_request` SET `tutor_id`= ?, `accepted` = '1' WHERE (`request_id` = ?);";
    connection.db.query(query, [tutor_id, accept], (err, result) => {
      if (err) {
        throw err;
      }
      res.redirect("back");
    });
  },

  rejectRequest: (req, res) => {
    let reject = req.body.reject;
    let tutor_id = req.body.tutorID;
    console.log(req.body.reject);
    console.log(tutor_id);
    const query =
      "INSERT INTO rejected_requests (request_id, rejected_by) VALUES (?, ?);";
    connection.db.query(query, [reject, tutor_id], (err, result) => {
      if (err) {
        throw err;
      }
      res.redirect("back");
    });
  },

  getTutorProfile: (req, res) => {
    let tutor_id = req.params.id;
    const query = "SELECT * FROM tutors WHERE tutor_id = ?";
    connection.db.query(query, tutor_id, (err, result) => {
      if (err) {
        throw err;
      }
      let tutor = result;
      //   console.log(tutor[0].tutor_id);
      let full_name = tutor[0].first_name + " " + tutor[0].last_name;
      const upcomingQuery =
        " (SELECT student_request.*, rejected_requests.rejected_by FROM student_request LEFT JOIN rejected_requests ON student_request.request_id = rejected_requests.request_id WHERE NOT EXISTS (SELECT * FROM rejected_requests WHERE (rejected_by = ?) GROUP BY request_id)) UNION (SELECT student_request.*, rejected_requests.rejected_by FROM student_request LEFT JOIN rejected_requests ON student_request.request_id = rejected_requests.request_id WHERE (rejected_by IS NULL) AND subject=? AND  (tutor_id IS NULL OR tutor_id = ?)  AND accepted IS FALSE AND start_time >= NOW())  ORDER BY start_time DESC LIMIT 4;";

      connection.db.query(
        upcomingQuery,
        [tutor[0].tutor_id, tutor[0].subject, tutor[0].tutor_id],
        (err, result) => {
          if (err) {
            throw err;
          }
          //   console.log(result);
          const requestedSessions = result.map(res => {
            return {
              request_id: res.request_id,
              subject: res.subject,
              topic: res.topic,
              description: res.description,
              start_time: res.start_time,
              end_time: res.end_time
            };
          });
          //   console.log(requestedSessions);

          const acceptedQuery =
            "SELECT * FROM student_request INNER JOIN students ON student_request.student_id = students.student_id WHERE tutor_id = ? AND start_time >= NOW() ORDER BY start_time DESC LIMIT 3;";

          connection.db.query(acceptedQuery, tutor_id, (err, result) => {
            if (err) {
              throw err;
            }
            let acceptedSessions = new Object();

            if (acceptedSessions.length === 0) {
              let emptyAccepted = new Object();
              emptyAccepted.student =
                "No Accepted Requests for Future Tutoring Sessions";
              emptyAccepted.subject = "";
              emptyAccepted.topic = "";
              emptyAccepted.description = "";
              emptyAccepted.start_time = "";
              acceptedSessions[0] = emptyAccepted;
            }
            acceptedSessions = result.map(res => {
              return {
                first_name: res.first_name,
                last_name: res.last_name,
                subject: res.subject,
                topic: res.topic,
                description: res.description,
                start_time: res.start_time,
                request_id: res.request_id
              };
            });
            res.render("tutorDashboard.ejs", {
              tutor,
              tutor_id,
              full_name,
              requestedSessions,
              acceptedSessions
            });
          });
        }
      );
    });
  }
};
