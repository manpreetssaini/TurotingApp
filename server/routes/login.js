'use strict';

const express = require('express');

const router = express.Router();

const passport = require('passport');

const bcrypt = require('bcrpytjs');

router.get('/login', (req, res) => {
  res.render('login')
});

module.exports = router;