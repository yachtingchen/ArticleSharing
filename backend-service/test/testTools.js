const User = require('gstore-node').model('User');
const jwt = require('jsonwebtoken');
const Config = require('../src/constants/Config');

module.exports = {
  createAndGetAdminToken: () => {
    return new User({
      email: 'unittest@g.com',
      password: 'isjl.3j28sdhjkljsfk',
      name: 'unittest',
      isAdmin: true,
      uploadFolder: 'unittest',
    }).save().then((data)=>{
      const user = data[0];
      const adminId = user.entityKey.id;
      const payload = { sub: adminId };
      return jwt.sign(payload, Config.jwtSecret);
    }); 
  },

  deleteUnitTestAdmin: () => {
    return User.findOne({ email: 'unittest@g.com' }).then((data)=>{
      return User.delete(data[0].entityKey.id);
    });
  }
}