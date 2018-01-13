const express = require('express');
const Multer = require('multer');
const format = require('util').format;
const router = new express.Router();
const moment = require('moment');
const Config = require('../constants/Config');
const bucket = require('../utils/storageBucket');
const User = require('gstore-node').model('User');

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

router.post('/', multer.single('image'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  const dateTime = moment.utc().format(Config.DATETIME_FORMAT_FOR_FILE_NAME);
  const guid = require('../utils/createGuid')();
  const fileExtension = req.file.originalname.split('.').pop();
  require('../utils/imgFileExtensionCheck')(fileExtension);
  
  User.get(req.userId).then((data)=>{
    const user = data[0];
    const buketFile = bucket.file(`${user.uploadFolder}/${dateTime}_${guid}.${fileExtension}`); 
    const fileStream = buketFile.createWriteStream();

    fileStream.on('error', (err) => {
      return next(err);      
    });

    fileStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const storageHelper = require('../utils/storageHelper');
      const publicUrl = format(`${storageHelper.getBucketUrl()}/${buketFile.name}`);
      res.status(200).send(publicUrl);
    });

    fileStream.end(req.file.buffer);

  }).catch((err)=>{
    return next(err);
  });
});


module.exports = router;
