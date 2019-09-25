/* eslint-disable new-cap */
const router = require('express').Router();
const Dog = require('../models/dog');

router
  .post('/', (req, res, next) => {
    Dog.create(req.body)
      .then(dog => {
        return res.json(dog);
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Dog.findById(req.params.id)
      .then(dog => {
        return res.json(dog);
      })
      .catch(next);
  });


module.exports = router;