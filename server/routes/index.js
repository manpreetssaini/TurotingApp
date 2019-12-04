'use strict';

const router = require('express').Router();
const { sendRequest, getStudentProfile } = require('./studentDashboard');
const { getTutorProfile } = require('./tutorDashboard');


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
};
