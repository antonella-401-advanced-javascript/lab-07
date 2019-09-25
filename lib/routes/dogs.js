/* eslint-disable new-cap */
const router = require('express').Router();
const Dog = require('../models/dog');

router
  .post('/', (req, res, next) => {
    console.log('req.body', req.body);
    Dog.create(req.body)
      .then(dog => {
        console.log('dog', dog);
        return res.json(dog);
      })
      .catch(next);
  });


module.exports = router;