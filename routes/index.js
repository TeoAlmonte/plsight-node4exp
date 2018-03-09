const express = require('express');
const router = express.Router();
const sql = require('mssql');

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
  res.render('view', {
    title: 'hey',
    nav: nav
  });
});

router.get('/:id', (req, res) => {
  let id = req.params.id
  let request = new sql.Request();
  request.query('select * from basix',
    (err, data) => {
      console.log(data.recordset)
      res.render('user', {
        recordset: data.recordset[id],
        people: people[id]
      });
    })
})

module.exports = router;