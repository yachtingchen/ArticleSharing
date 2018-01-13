const winston = require('winston');
const User = require('gstore-node').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const hashHelper = require('../utils/hashHelper');

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
    password: hashHelper(password.trim()),
    name: req.body.name.trim()    
  };

  const query = User.query().filter('email', '=', userData.email);
  
  query.run().then((result) => {
    //check for duplicated email
    const response = result[0];
    const entities = response.entities;
    if (entities.length > 0)
      throw new Error('EmailRegistered');
  }).then(() =>{
    return new User(userData).save();
  }).then((data) => {
    const newUser = data[0];
    const userId = newUser.entityKey.id;
    return User.update(userId, { uploadFolder: newUser.getNewUploadFolder()});
  }).then(() => {
    return done(null);
  }).catch((err) => {
    winston.error(err.stack);
    done(err);
   });
});
