const jwt = require('jsonwebtoken');
const PassportLocalStrategy = require('passport-local').Strategy;
const Config = require('../constants/Config');
const winston = require('winston');
const User = require('gstore-node').model('User');
const intl = require('../utils/intl');


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false, // set the session option to false due to we will use the token approach to authentication
  passReqToCallback: true
}, 
//it's veriy callback. execution result (done(xxx)) will send to passport.authenticate callback as parameter
(req, email, password, done) => {

  const userData = {
    email: email.trim(),
    password: password.trim()
  };

  return User.findOne({ email: userData.email }, (err, user) => {
    if (err) { 
      if (err.code === 404){
        const error = new Error();
        error.name = intl.ACCOUNT_NOT_EXIST;
        return done(error);
      }
      winston.error(err.stack);
      return done(err);
    }

    if (!user || !user.comparePassword(userData.password)) { // check if a hashed user's password is equal to a value saved in the database
      const error = new Error();
      error.name = 'IncorrectCredentialsError';
      return done(error);
    }

    //sub is a reserved key for a subject item
    const payload = { sub: user.entityKey.id };
    const token = jwt.sign(payload, Config.jwtSecret);
    return done(null, token, { name: user.name, isAdmin: user.isAdmin });
  });
});
