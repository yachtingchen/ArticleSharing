const winston = require('winston');
const Mailer = require('../utils/mailer');
const validator = require('validator');
const intl = require('../utils/intl');
const Config = require('../constants/Config');
const User = require('gstore-node').model('User');
const Work = require('gstore-node').model('Work');
const Category = require('gstore-node').model('Category');
const bucket = require('../utils/storageBucket');
const hashHelper = require('../utils/hashHelper');
const deltaHelper = require('../utils/deltaHelper');
const getWords = require('../utils/getWords');

const express = require('express');
const router = new express.Router();

function validateMemberEditForm(payload){
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = intl.nameEmtyp;
  }

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = intl.emailError;
  }

  if (!payload || typeof payload.oldPassword !== 'string' || payload.oldPassword.trim().length === 0) {
    isFormValid = false;
    errors.oldPassword = intl.pwdEmpty;
  }

  if (!payload || typeof payload.newPassword !== 'string' || payload.newPassword.trim().length < Config.PASSWORD_MIN_LENGTH) {
    isFormValid = false;
    errors.newPassword = intl.passwordNotLongEnough;
  }

  if (!payload || typeof payload.newPasswordConfrim !== 'string' || 
    payload.newPassword !== payload.newPasswordConfrim) {
    isFormValid = false;
    errors.newPasswordConfrim = intl.PASSWORD_NOT_EQUAL;
  }

  if (!isFormValid) {
    message = intl.formDataError;
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

function validateWorkEditForm(payload){
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload) {
    return {
      success: false,
      message: intl.formDataError,
      errors
    };
  }
  
  if (typeof payload.isVisible !== 'boolean') {
    isFormValid = false;
  }

  if (typeof payload.showInFrontPage !== 'boolean') {
    isFormValid = false;
  }

  if (typeof payload.title !== 'string' || payload.title.trim().length === 0) {
    isFormValid = false;
    errors.title = intl.PLZ_INPUT_WORK_TITLE;
  }

  if (typeof payload.serial !== 'string') {
    isFormValid = false;
  }

  if (typeof payload.workImgUrl !== 'string' || payload.workImgUrl.trim().length === 0) {
    isFormValid = false;
    errors.workImgUrl = intl.PLZ_UPLOAD_WORK_IMG;
  }

  if (typeof payload.workDesc !== 'object') {
    isFormValid = false;
    errors.workDesc = intl.PLZ_INPUT_WORK_DESC;
  }

  if (typeof payload.downloadInstruction !== 'object') {
    isFormValid = false;
    errors.downloadInstruction = intl.PLZ_INPUT_DOWNLOAD_INSTRUCTIONS;
  }

  if (!isFormValid) {
    message = intl.formDataError;
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

function validateCategoryEditForm(payload){
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload) {
    return {
      success: false,
      message: intl.formDataError,
      errors
    };
  }
  
  if (typeof payload.isVisible !== 'boolean') {
    isFormValid = false;
  }

  if (payload.parent && typeof payload.parent !== 'number') {
    isFormValid = false;
  }

  if (typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = intl.PLZ_INPUT_CATEGORY_NAME;
  }

  if (!isFormValid) {
    message = intl.formDataError;
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

function getImageFilesUsed(work) {

  const storageHelper = require('../utils/storageHelper');

  return [
    storageHelper.getFileNameFromUrl(work.workImgUrl),
    ...deltaHelper.getImgUrls(work.workDesc).map((_)=> storageHelper.getFileNameFromUrl(_)),
    ...deltaHelper.getImgUrls(work.downloadInstruction).map((_)=> storageHelper.getFileNameFromUrl(_))
  ];
}

function addOrEditWork(req, res, next) {
  if (!req.user.isAdmin) { return res.status(401).end(); }

  const validationResult = validateWorkEditForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  const imageFilesUsed = getImageFilesUsed(req.body);
  let user;
  const isPostingWork = typeof req.params.id === 'undefined';

  User.get(req.userId).then((data)=>{
    user = data[0];    
    return bucket.getFiles({ prefix: user.uploadFolder}); //find unused images
  }).then((data)=>{
    const uploadedImgs = data[0];    
    return Promise.all(uploadedImgs.map((_)=>{
      if(!imageFilesUsed.includes(_.name))
        return _.delete(); //delete unused images
    }));
  }).then(()=>{
    user.uploadFolder = user.getNewUploadFolder();
    return user.save();
  }).then(()=>{
    let workData = Object.assign(req.body, { titleArray: getWords(req.body.title)});

    if (isPostingWork) {      
      return new Work(workData).save();
    } else {
      return Work.update(req.params.id, workData);      
    }    
  }).then((data) => {
    if (isPostingWork) {
      res.json({ id: data[0].entityKey.id });
    } else {
      res.end();
    }
  }).catch((err) => {
    next(err);
  });
}

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message."
  });
});

router.post('/member_edit', (req, res, next) => {
  const validationResult = validateMemberEditForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return User.get(req.userId).then((entities) => {
    return entities[0];
  }).then((user) => {
    // check if a hashed user's password is equal to a value saved in the database
    const isMatch = user.comparePassword(req.body.oldPassword);
    if (!isMatch){
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: { oldPassword: intl.PASSWORD_INCORRECT }
      });
    }

    user.password = hashHelper(req.body.newPassword);
    user.email = req.body.email;
    user.name = req.body.name;
    return user.save();
  }).then(() => {
    return res.end();
  }).catch((err) => {
    winston.error(err.stack);
    Mailer.SendTextMail('member_edit: ' + err.stack);
    return res.status(400).json({
      success: false,
      message: intl.SAVE_DATA_FAILED
    });
  });//end catch
});


router.post('/work', (req, res, next) => {
  addOrEditWork(req, res, next);
});

router.put('/work/:id', (req, res, next) => {
  addOrEditWork(req, res, next);
});

router.delete('/work/:id', (req, res, next) => {
  if (!req.user.isAdmin) { return res.status(401).end(); }
	Work.delete(req.params.id).then((data) => {
    return data[0] ? res.end() : res.status(404).end();
  }).catch((err) => {    
    return next(err);
  });  
});

router.post('/category', (req, res, next) => {
  if (!req.user.isAdmin) { return res.status(401).end(); }
  const validationResult = validateCategoryEditForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return new Category(req.body).save().then((data) => {
    return res.json(data[0].plain());
  }).catch((err) => {
    return next(err);
  });
});

router.delete('/category/:id', (req, res, next) => {  
  if (!req.user.isAdmin) { return res.status(401).end(); }
	Category.delete(req.params.id).then((data) => {
    return data[0] ? res.end() : res.status(404).end();
  }).catch((err) => {    
    return next(err);
  });
});

router.put('/category/:id', (req, res, next) => {
  if (!req.user.isAdmin) { return res.status(401).end(); }
  const validationResult = validateCategoryEditForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  Category.update(req.params.id, req.body).then((data)=>{
    return res.json(data[0].plain());
  }).catch((err)=>{
    if (err.code === 404){
      return res.status(404).end();
    }
    return next(err);
  });
});

module.exports = router;
