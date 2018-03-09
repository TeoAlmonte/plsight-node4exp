const express = require('express');
const router = express.Router();
const mongodb = require('mongodb').MongoClient;

router.post('/signUp', (req, res) => {
  console.log(`the ${req.body.username}`);
  req.login(req.body, function () {
    res.redirect('/auth/profile');
  });
});

router.get('/profile', (req, res) => {
  res.json(req.body);


});

module.exports = router;