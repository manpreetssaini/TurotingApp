const connection = require("../../connection");
const moment = require("moment");

module.exports = {
  completeTutorInfo: (req, res) => {
    let tutor_id = req.params.id;
    console.log("SUCCESS");
  },

  submitStudentReview: (req, res) => {
    let getMemberId = "SELECT * FROM student_request WHERE request_id = ?";
    connection.db.query(getMemberId, req.body.session_id, (err, result) => {
      if (err) {
        throw err;
      }
      let tutor_id = result[0].tutor_id;
      let submitStudentReviewQuery =
        "INSERT INTO student_rating (request_id, student_id, rating, timestamp, message) VALUES (?, ?, ?, NOW(), ?);";
      connection.db.query(
        submitStudentReviewQuery,
        [
          result[0].request_id,
          result[0].student_id,
          Number(req.body.rating),
          req.body.message
        ],
        (err, result) => {
          if (err) {
            throw err;
          }
          res.redirect("/tutorDashboard/" + tutor_id);
        }
      );
    });
  },

  studentRating: (req, res) => {
    let session_id = req.params.id;
    let user_name = req.params.user_name;
    res.render("studentRating.ejs", { session_id, user_name });
  },
  submitEdit: (req, res) => {
    const updateQuery =
      "UPDATE tutors SET `first_name`= ?, `last_name` = ?, `city`=?, `speciality`=? WHERE (`tutor_id` = ?);";

    connection.db.query(
      updateQuery,
      [
        req.body.first_name,
        req.body.last_name,
        req.body.location,
        req.body.specialty,
        req.body.tutorID
      ],
      (err, result) => {
        console.log(
          req.body.username +
            " " +
            req.body.first_name +
            " " +
            req.body.last_name +
            " " +
            req.body.location +
            " " +
            req.body.specialty +
            " " +
            req.body.tutorID
        );
        console.log(updateQuery);
        if (err) {
          throw err;
        }
        res.redirect("tutordashboard/" + req.body.tutorID);
      }
    );
  },
  editProfile: (req, res) => {
    let tutor_id = req.body.tutor_id;
    console.log(tutor_id);

    const editQuery = "SELECT * FROM tutors WHERE tutor_id = ?";

    connection.db.query(editQuery, [tutor_id], (err, result) => {
      if (err) {
        throw err;
      }
      let tutor = result;
      let full_name = tutor[0].first_name + " " + tutor[0].last_name;
      res.render("editProfile", { tutor_id, full_name, tutor });
    });
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
      let tutorDOB = moment(result[0].dob).format("YYYY/MM/DD");

      let full_name = tutor[0].first_name + " " + tutor[0].last_name;
      const upcomingQuery =
        "SELECT * FROM student_request WHERE subject=? AND accepted=0 AND (city=? OR tutor_id = ?) AND start_time >= NOW() AND student_request.request_id NOT IN (SELECT request_id FROM rejected_requests WHERE rejected_by = ?) ORDER BY request_id DESC;";

      connection.db.query(
        upcomingQuery,
        [
          tutor[0].speciality,
          tutor[0].city,
          tutor[0].tutor_id,
          tutor[0].tutor_id
        ],
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
              start_time: moment(res.start_time).format("YYYY/MM/DD, HH:mm"),
              end_time: moment(res.end_time).format("YYYY/MM/DD, HH:mm")
            };
          });

          const acceptedQuery =
            "SELECT * FROM student_request INNER JOIN students ON student_request.student_id = students.student_id WHERE accepted=1 AND tutor_id = ? AND start_time >= NOW() ORDER BY start_time DESC LIMIT 3;";

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
                start_time: moment(res.start_time).format("YYYY/MM/DD, HH:mm"),
                request_id: res.request_id
              };
            });

            const historyQuery =
              "SELECT student_request.request_id, students.user_name, student_request.topic, student_request.start_time, student_rating.rating, student_request.student_id FROM student_request LEFT JOIN students ON student_request.student_id = students.student_id LEFT JOIN student_rating ON student_request.request_id = student_rating.request_id WHERE student_request.tutor_id = ? AND student_request.tutor_id IS NOT NULL AND start_time < NOW();";
            connection.db.query(
              historyQuery,
              tutor[0].tutor_id,
              (err, result) => {
                if (err) {
                  throw err;
                }
                const pastSessions = result.map(res => {
                  return {
                    name: res.user_name,
                    session_id: res.request_id,
                    topic: res.topic,
                    date: moment(res.start_time).format("YYYY/MM/DD"),
                    rating: res.rating,
                    student_id: res.student_id
                  };
                });

                const getRatingQuery =
                  "SELECT AVG(rating) AS 'rating' FROM tutor_rating WHERE tutor_id = ? ";
                connection.db.query(
                  getRatingQuery,
                  tutor[0].tutor_id,
                  (err, result) => {
                    if (err) {
                      throw err;
                    }
                    let average_rating;
                    if (
                      result[0].rating === null ||
                      result[0].rating === undefined
                    ) {
                      average_rating = "No reviews yet";
                    } else {
                      average_rating = result[0].rating;
                    }
                    res.render("tutorDashboard.ejs", {
                      tutor,
                      tutorDOB,
                      tutor_id,
                      full_name,
                      requestedSessions,
                      acceptedSessions,
                      average_rating,
                      pastSessions
                    });
                  }
                );
              }
            );
          });
        }
      );
    });
  }
};
