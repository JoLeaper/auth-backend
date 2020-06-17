const { Router } = require('express');
const CardListing = require('../models/CardListing');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    CardListing
      .create({ ...req.body, seller: req.user._id })
      .then(user => res.send(user))
      .catch(next);
  })
  .get('/', ensureAuth, (req, res, next) => {
    CardListing
      .find()
      .then(listings => res.send(listings))
      .catch(next);
  });
