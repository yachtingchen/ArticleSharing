const jwt = require('jsonwebtoken');
const Config = require('../constants/Config');
const User = require('gstore-node').model('User');


/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];
  
  // decode the token using a secret key-phrase
  return jwt.verify(token, Config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // check if a user exists
    return User.get(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      } else {
        req.userId = userId;
        req.user = user;
        return next();
      }      
    });
  });
};
