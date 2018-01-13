const gstore = require('gstore-node');

const WorkSchema = new gstore.Schema({
  title: {type: 'string'},
  titleArray: {type: 'array'},
  serial: {type: 'string'},
  workImgUrl: {type: 'string'},
  workDesc: {type: 'object'}, //quill delta object
  downloadInstruction: {type: 'object'}, //quill delta object
  isVisible: {type: 'boolean', default: true},
  showInFrontPage: {type: 'boolean', default: false},
  createdOn: {type: 'datetime', default: gstore.defaultValues.NOW}
  //authorId!! (user form fb, google, local, weibo...)
});

module.exports = gstore.model('Work', WorkSchema);