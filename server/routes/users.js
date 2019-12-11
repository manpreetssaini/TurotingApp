const express = require('express');
const User = require('../db/user');
const router = express.Router();

// create an object from the class User in the file core/user.js
const user = new User();

// Get the main page
router.get('/', (req, res) => {
    res.render('index');
});

// Get home page
router.get('/', (req, res, next) => {
    let user = req.session.user;

    if (user) {
        res.render('home', { opp: req.session.opp, name: user.username });
        return;
    }
    res.redirect('/');
    next();
});

router.get('/login', (req, res) => {
    res.render('login');
});

// Post login data
router.post('/login', (req, res, next) => {
    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data).
    user.login(req.body.email, req.body.password, function (result) {
        if (result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the home page.
            res.render('dashboard');
        } else {
            // if the login function returns null send this error message back to the user.
            res.send('Username/Password incorrect!');
            next();
        }
    })

});

router.get('/register', (req, res) => {
    res.render('register');
});

// Post register data
router.post('/register', (req, res) => {
    const { username, email, password, password2 } = req.body;
    let errors = [];

    // check required fields
    if (!username || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // check passwords match 
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match ' });
    }

    //check pass length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be atleast 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            username,
            email,
            password,
            password2
        })
    } else {
        // prepare an object containing all user inputs.
        let userInput = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        console.log(user);
        // call create function. to create a new user. if there is no error this function will return it's id.
        user.create(userInput, function (lastId) {
            // if the creation of the user goes well we should get an integer (id of the inserted user)
            if (lastId) {
                // Get the user data by it's id. and store it in a session.
                user.find(lastId, function (result) {
                    req.session.user = result;
                    req.session.opp = 0;
                    res.redirect('dashboard');
                });

            } else {
                console.log('Error creating a new user ...');

            }
        });

    }

});



// Get loggout page
router.get('/loggout', (req, res, next) => {
    // Check if the session is exist
    if (req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function () {
            res.redirect('login');
        });
        next();
    }
});

module.exports = router;