const express = require('express');
const router = express.Router();
const mongodb = require('mongodb').MongoClient;


router.post('/signUp', (req, res) => {
  console.log(req.body)
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
          res.redirect('/auth/profile')
        })
      })
    })
})

router.get('/profile', (req, res) => {
  res.json(req.user)
})

module.exports = router;