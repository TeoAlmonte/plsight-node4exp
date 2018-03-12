const express = require('express');
const router = express.Router();
const mongodb = require('mongodb').MongoClient;
const passport = require('passport');

router.post('/signUp', (req, res) => {
  console.log(req.body);
  const url = 'mongodb://localhost:27017/libapp';
  mongodb.connect(url, (err, client) => {
    let db = client.db('libapp');
    let collection = db.collection('users');
      let user = {
        username: req.body.username,
        password: req.body.password
      };
      collection.insert(user, (err, results) => {
        req.login(results.ops[0], () => {
          res.redirect('/auth/profile');
        });
      });
    });
});

router.post('/signIn',
  passport.authenticate('local', {
    failureRedirect: '/',
    }), (req, res) => {
  res.redirect('/auth/profile');
});

router.get('/profile', (req, res, next) => {
  if (!req.user) {
    res.redirect('/');
  }
  next();
  res.json(req.user);
});

module.exports = router;