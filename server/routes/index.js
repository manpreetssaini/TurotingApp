'use strict';

const router = require('express').Router();
const { sendRequest, getStudentProfile } = require('./studentDashboard');
const { getTutorProfile } = require('./tutorDashboard');
const { registeration } = require('./login-register');
const { login } = require('./login-register');

module.exports = app => {
  app.get('/results', (req, res) => {
    res.render('results');
  });

  app.get('/search', (req, res) => {
    res.render('search');
  });

  app.get('/studendashboard/:id', getStudentProfile);
  app.post('/sendRequest', sendRequest);
  app.get('/tutordashboard', getTutorProfile);

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.post('/login', login);

  app.get('/register', (req, res) => {
    res.render('register')
  });

  app.post('/register', registeration);

};