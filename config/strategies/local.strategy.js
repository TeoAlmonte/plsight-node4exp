/*jshint esversion: 6 */
const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;

module.exports = function () {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
function (username, password, done) {
    let user = {
      username: username,
      password: password
    };
    done(null, user);
  }));
};