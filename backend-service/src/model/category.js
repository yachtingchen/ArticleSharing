const gstore = require('gstore-node');

const CategorySchema = new gstore.Schema({
  name: {type: 'string'},
  order: {type: 'number'},
  parent: {type: 'number'}, //parent Category id
  isVisible: {type: 'boolean', default: true}
});


CategorySchema.methods.isRoot = function isRoot() {
  return this.parent === null;
};

module.exports = gstore.model('Category', CategorySchema);