const gstore = require('gstore-node');
const bcryptjs = require('bcryptjs');
const moment = require('moment');
const Config = require('../constants/Config');

const UserSchema = new gstore.Schema({
  email: {type: 'string'},
  password: {type: 'string'},
  name: {type: 'string'},
  isAdmin: {type: 'boolean', default: false},
  uploadFolder: {type: 'string'},
  createdOn: {type: 'datetime', default: gstore.defaultValues.NOW}
});


/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} plainPassword
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(plainPassword) {
  return bcryptjs.compareSync(plainPassword, this.password);
};

UserSchema.methods.getNewUploadFolder = function getNewUploadFolder() {
  const dateTime = moment.utc().format(Config.DATETIME_FORMAT_FOR_FILE_NAME);
  return `people/${this.entityKey.id}/${dateTime}`;
};


module.exports = gstore.model('User', UserSchema);