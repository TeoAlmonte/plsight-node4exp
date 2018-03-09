const express = require('express');
const router = express.Router();
const mongodb = require('mongodb').MongoClient;

people = [
  {
    'name': 'Tom',
    'age': '3'
  },
  {
    'name': 'Rick',
    'age': '4'
  }
];

router.get('/addUser', (req, res) => {
  const url = 'mongodb://localhost:27017/libapp';
  mongodb.connect(url, (err, client) => {
    let db = client.db('libapp');
    let collection = db.collection('people');
    collection.insertMany(people, (err, results) => {
      res.send(results)
      client.close();
    })
  })
});

module.exports = router;