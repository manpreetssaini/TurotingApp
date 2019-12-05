const pool = require('./pool');
const bcrypt = require('bcryptjs');

function User() { }

User.prototype = {
    // find the user data by id or username.
    find: function (user = null, callback) {
        //if the user is defined
        if (user) {
            var field = Number.isInteger(user) ? 'id' : 'username';
        }
        //preparing sql query
        let sql = `SELECT * FROM users WHERE ${field} = ?`;

        pool.query(sql, user, function (err, result) {
            if (err)
                throw err;
            if (result.lenght) {
                callback(result[0]);
            } else {
                callback(null);
            }
        });
    },


    //Create a new user 

    create: function (body, callback) {
        let pwd = body.password;
        // hash the password
        body.password = bcrypt.hashSync(pwd, 10);

        // this array will contain the values of the fields

        let bind = [];
        //loop in the attributes of the object and push the values into the bind array

        for (prop in body) {
            bind.push(body[prop]);
        }
        // sql query
        let sql = `INSERT INTO users(email, fullname, password) VALUES (?, ?, ?)`
        // call the query give it the sql string and the values(bind array)
        pool.query(sql, bind, function (err, result) {
            if (err)
                throw err;
            // return the last inserted id. if there is no error
            callback(result.insertID);
        });
    },

    login: function (email, password, callback) {
        //find the user data by email
        this.find(email, function (user) {
            // if there is a user by this email
            if (user) {
                // now we check his password
                if (bcrypt.compareSync(password, user.password)) {
                    //return his data.
                    callback(user);
                    return;
                }
            }
            // if the username/password is wrong then return null
            callback(null);
        });
    }
}

module.exports = User;