const bcryptjs = require('bcryptjs');

module.exports = (plainPassword) => {

  if (!plainPassword) {
    // nothing to hash... exit 
    return plainPassword;
  }
  
  let salt = bcryptjs.genSaltSync(5);
  let hash = bcryptjs.hashSync(plainPassword, salt);
  return hash;
};