/* eslint-disable no-undef */
const express = require('express');
const User = require('../db/user');
const router = express.Router();

//create an object from the class User in the file user.js

const user = new User();

// get the index page

router.get('/', (req, res) => {
    let user = req.session.user;
    //if there is a session named user that means that the user is logged in. so the user gets redirected to the home page
    if (user) {
        res.redirect('home');
        return;
    }

    // if not then we send the index page
    res.redirect('login');
});

// Post login data

router.get('/login', (req, res) => {
    res.render('login')
});

router.post('/login', (req, res) => {
    // the data sent from the user is stored in res.body.object
    //call our login function and it will return the result (the user data from db)

    user.login(req.body.email, req.body.password, function (result) {
        if (result) {
            // store the user data in a session
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the homepage
            res.redirect('home');
        } else {
            // if the login function returns null send this error message
            res.send('Username/Password incorrect! ');
        }
    })

    // Post register data

    router.get('/', (req, res) => {
        res.render('register')
    });

    router.post('/', (req, res) => {
        // prepare an object containing all user inputs
        let userInput = {
            email: req.body.email,
            fullname: req.body.fullname,
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
                    res.redirect('home');
                });
            } else {
                console.log('ERROR CREATING A USER ... ');
            }
        });
    });
});

module.exports = router;
