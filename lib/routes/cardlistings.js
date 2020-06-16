const { Router } = require('express');
const CardListing = require('../models/CardListing');
const ensureAuth = require('../middleware/ensureAuth');

const setCookie = (user, res) => {
  res.cookie('session', user.authToken(), {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true
  });
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    CardListing
      .create(req.body)
      .then(user => res.send(user))
      .catch(next);
  });
