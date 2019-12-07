const connection = require("../../connection");

module.exports = {
  search: (req, res) => {
    let searchCriteria = req.param("searchCriteria");
    let student_id = req.param("studentID");
    console.log(searchCriteria);
    console.log(student_id);
    const searchQuery =
      "SELECT * FROM `tutors` WHERE (`user_name` LIKE '%" +
      searchCriteria +
      "%' OR `city` LIKE '%" +
      searchCriteria +
      "%' OR `speciality` LIKE '%" +
      searchCriteria +
      "%');";
    connection.db.query(searchQuery, (err, result) => {
      if (err) {
        throw err;
      }

      let tutorsPage = new Array();
      const tutors = result.map(res => {
        return {
          tutor_id: res.tutor_id,
          user_name: res.user_name,
          speciality: res.speciality,
          location: res.city,
          description: res.description
        };
      });

      console.log(tutors.length);
      res.render("results", { tutors });
    });
  }
};
