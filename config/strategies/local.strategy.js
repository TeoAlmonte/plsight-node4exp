/*jshint esversion: 6 */
const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      mongodb = require('mongodb').MongoClient

module.exports = function () {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function (username, password, done) {
    const url =
      'mongodb://localhost:27017/libapp';

    mongodb.connect(url, (err, client) => {
      let db = client.db('libapp');
      let collection = db.collection('users');
      collection.findOne({
        username: username
        },
        (err, results) => {
          if (results.password === password) {
            console.log(results);
            console.log('results passed');
            let user = results;
            done(null, user);
          } else {
            console.log('results failed');
            done(null, false, {
              message: 'bad'
            });
          }
        }
      );
    });
  }));
};

