"use strict";

const util = require("util");
const mysql = require("mysql");

//local mysql db connection
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "password",
  database: "tutors_db"
});

pool.getConnection((err, connection) => {
  if (err) console.log("Something went wrong connecting to the database ..");
  console.log(err);

  if (connection) connection.release();
  return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
