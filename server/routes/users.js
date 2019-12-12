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

router.get('/studentlogin', (req, res) => {
    res.render('studentlogin');
});

// Post login data
router.post('/studentlogin', (req, res, next) => {
    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data).
    user.login(req.body.email, req.body.password, function (result) {
        if (result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the home page.
            res.redirect('/dashboard');
        } else {
            // if the login function returns null send this error message back to the user.
            req.flash('error', 'You are not registered !!');
            res.redirect('studentlogin');
            next();
        }
    })

});

router.get('/studentregister', (req, res) => {
    res.render('studentregister');
});

// Post register data
router.post('/studentregister', (req, res) => {
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
        res.render('studentregister', {
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
                    req.flash('success_msg', 'You are now registered');
                    res.redirect('studentlogin');
                });
            } else {
                console.log('Error creating a new user ...');

            }
        });

    }

});



// // Get loggout page
// router.get('/loggout', (req, res, next) => {
//     // Check if the session is exist
//     if (req.session.user) {
//         // destroy the session and redirect the user to the index page.
//         req.session.destroy(function () {
//             res.redirect('login');
//         });
//         next();
//     }
// });

router.get('/studentlogout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/studentlogin');
});

router.get('/tutorlogin', (req, res) => {
    res.render('tutorlogin');
});

// Post login data
router.post('/tutorlogin', (req, res, next) => {
    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data).
    user.login(req.body.email, req.body.password, function (result) {
        if (result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the home page.
            res.redirect('/dashboard');
        } else {
            // if the login function returns null send this error message back to the user.
            req.flash('error', 'You are not registered !!');
            res.redirect('tutorlogin');
            next();
        }
    })

});

router.get('/tutorregister', (req, res) => {
    res.render('tutorregister');
});

// Post register data
router.post('/tutorregister', (req, res) => {
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
        res.render('tutorregister', {
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
                    req.flash('success_msg', 'You are now registered');
                    res.redirect('tutorlogin');
                });
            } else {
                console.log('Error creating a new user ...');

            }
        });

    }

});



// // Get loggout page
// router.get('/loggout', (req, res, next) => {
//     // Check if the session is exist
//     if (req.session.user) {
//         // destroy the session and redirect the user to the index page.
//         req.session.destroy(function () {
//             res.redirect('login');
//         });
//         next();
//     }
// });

router.get('/tutorlogout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/tutorlogin');
});



module.exports = router;