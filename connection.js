const mysql = require("mysql");

const db = mysql.createConnection({
  // Replace with user-appropriate values
  host: "localhost",
  user: "root",
  password: "password",
  database: "tutors_db",
  port: 3306
});

db.connect(err => {
  if (!err) {
    console.log("Connected to the database");
  } else {
    throw err;
  }
});

module.exports = { db: db };
