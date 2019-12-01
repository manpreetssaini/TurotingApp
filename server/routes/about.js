'use strict';

const express = require('express');

const router = express.Router();

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;



router.get('/login', checkAuthenticated, (req, res) => {
  res.render('login.ejs')
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  sucessRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
});

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrpyt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
  console.log(users)
});


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next();
};


module.exports = router;