'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const flash = require('express-flash');


const initializePassport = require('/TutoringApp/passport-config');
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

const users = []


router.get('/login', (req, res) => {
  res.render('login.ejs')
});

router.post('/login', passport.authenticate('local', {
  sucessRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

// router.get('/register', checkNotAuthenticated, (req, res) => {
//   res.render('register.ejs')
// });

// router.post('/register', async (req, res) => {
//   try {
//     const hashedPassword = await bcrpyt.hash(req.body.password, 10)
//     users.push({
//       id: Date.now().toString(),
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword
//     });
//     res.redirect('/login')
//   } catch {
//     res.redirect('/register')
//   }
//   console.log(users)
// });


// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next()
//   }
//   res.redirect('/login')
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect('/')
//   }
//   next();
// };


module.exports = router;