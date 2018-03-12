const express = require('express');
const router = express.Router();
const sql = require('mssql');
const mongodb = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;

nav = [
  {
    'link': '//google.com',
    'text': 'google'
  },
  {
    'link': '//yahoo.com',
    'text': 'yahoo'
  }
];

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

router.get('/', (req, res) => {
  let request = new sql.Request();
  request.query('select * from basix',
    (err, data) => {
      console.log(data.recordset)
      res.render('index', {
        title: 'hey',
        nav: nav,
        people: people,
        recordset: data.recordset
      });
    })
});

router.get('/view', (req, res) => {
  const url = 'mongodb://localhost:27017/libapp';
  mongodb.connect(url, (err, client) => {
    let db = client.db('libapp');
    let collection = db.collection('people');
    collection.find({}).toArray(
      (err, results) => {
        console.log(results)
        res.render('view', {
          title: 'hey',
          nav: nav,
          people: results
        })
      }
    )
  })
});

router.get('/:id', (req, res) => {
  let id = new objectId(req.params.id);
  const url = 'mongodb://localhost:27017/libapp';
  mongodb.connect(url, (err, client) => {
    let db = client.db('libapp');
    let collection = db.collection('people');
    collection.findOne({_id: id},
      (err, results) => {
        console.log(results)
        res.render('user', {
          title: 'hey',
          nav: nav,
          result: results
        });
      }
    );
  });
});



// router.get('/:id', (req, res) => {
//   let id = req.params.id
//   let request = new sql.Request();
//   request.query('select * from basix',
//     (err, data) => {
//       console.log(data.recordset)
//       res.render('user', {
//         recordset: data.recordset[id],
//         people: people[id]
//       });
//     })
// })

module.exports = router;