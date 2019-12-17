const pool = require("./pool");
const bcrypt = require("bcryptjs");

function Student() {}

Student.prototype = {
  // Find the user data by id or username.
  find: function(user = null, callback) {
    // if the user variable is defind
    if (user) {
      // if user = number return field = id, if user = string return field = username.
      var field = Number.isInteger(user) ? "user_name" : "email";
    }
    // prepare the sql query
    let sql = `SELECT * FROM students WHERE ${field} = ?`;

    pool.query(sql, user, function(err, result) {
      if (err) throw err;

      if (result.length) {
        callback(result[0]);
      } else {
        callback(null);
      }
    });
  },

  // This function will insert data into the database. (create a new user)
  // body is an object
  create: function(body, callback) {
    var pwd = body.password;
    // Hash the password before insert it into the database.
    body.password = bcrypt.hashSync(pwd, 10);

    // this array will contain the values of the fields.
    var bind = [];
    // loop in the attributes of the object and push the values into the bind array.
    for (prop in body) {
      bind.push(body[prop]);
    }
    console.log(bind);
    // prepare the sql query
    let sql =
      "INSERT INTO  students (user_name, email, password, first_name, last_name, city, DOB) VALUES (?, ?, ?, ?, ?, ?, ?);";

    // call the query give it the sql string and the values (bind array)
    pool.query(sql, bind, function(err, result) {
      if (err) throw err;
      // return the last inserted id. if there is no error
      callback(result.insertId);
    });
  },

  login: function(email, password, callback) {
    // find the user data by his username.
    this.find(email, function(user) {
      // if there is a user by this username.
      if (user) {
        // now we check his password.
        if (bcrypt.compareSync(password, user.password)) {
          // return his data.
          callback(user);
          return;
        }
      }
      // if the username/password is wrong then return null.
      callback(null);
    });
  }
};

module.exports = Student;
