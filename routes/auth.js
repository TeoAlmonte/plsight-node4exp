const express = require('express');
const router = express.Router();
const mongodb = require('mongodb').MongoClient;


router.post('/signUp', (req, res) => {
  console.log(req.body)
  req.login(req.body, () => {
    res.redirect('/auth/profile')
  })
})

router.get('/profile', (req, res) => {
  res.json(req.user)
})

module.exports = router;