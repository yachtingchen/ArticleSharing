const Config = require('../constants/Config');
const bucket = require('./storageBucket');

const bucketUrl = `${Config.STORAGE_ORIGIN}/${bucket.name}`;

module.exports = {
  getBucketUrl: () => {
    return bucketUrl;
  },

  getFileNameFromUrl: (url) => {
    return url.replace(bucketUrl+'/', '');
  }

};