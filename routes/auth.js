const express = require('express');
const router = express.Router();
const mongodb = require('mongodb').MongoClient;
var passport = require('passport');

router.post('/signUp',function(req, res){
  // console.log(req.body);
  req.login(req.body, function () {
    res.redirect('/auth/profile');
  });
});

router.get('/profile', (req, res) => {
  console.log(`profile page ${req.body}`);
  res.json(req.user)
});


module.exports = router;