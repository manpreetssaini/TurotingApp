const connection = require("../../connection");

module.exports = {
  getTutorProfile: (req, res) => {
    const query = "SELECT * FROM tutors LIMIT 1";
    connection.db.query(query, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      let tutor = result;

      let full_name = tutor[0].first_name + " " + tutor[0].last_name;
      console.log(full_name);
      const upcomingQuery =
        "SELECT * FROM student_request WHERE subject='" +
        tutor[0].speciality +
        "'" +
        "AND start_time >= NOW() LIMIT 3";
      connection.db.query(upcomingQuery, (err, result) => {
        if (err) {
          throw err;
        }
        const requestedSessions = result.map(res => {
          return {
            subject: res.subject,
            topic: res.topic,
            description: res.description,
            start_time: res.start_time,
            end_time: res.end_time
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
