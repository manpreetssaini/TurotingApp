/* eslint-disable no-undef */
const express = require('express');
const User = require('../db/user');
const router = express.Router();

//create an object from the class User in the file user.js

const user = new User();



// Post register data

router.get('/register', (req, res) => {
    res.render('register')
});

router.post('/register', (req, res) => {
    // prepare an object containing all user inputs
    let userInput = {
        email: req.body.email,
        user_name: req.body.user_name,
        password: req.body.password
    };

    //call create function to create a new user if there is no error this function will return its id

    user.create(userInput, function (lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if (lastId) {
            // get the user data by its id. and store it in a session
            user.find(lastId, function (result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('login');
            });
        } else {
            console.log('ERROR CREATING A USER ... ');
        }
    });
});


module.exports = router;
