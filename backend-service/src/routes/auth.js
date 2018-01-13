const express = require('express');
const validator = require('validator');
const passport = require('passport');
const svgCaptcha = require('svg-captcha');
const CryptoJS = require("crypto-js");
const Mailer = require('../utils/mailer');
const gstore = require('gstore-node');
const intl = require('../utils/intl');
const Config = require('../constants/Config');
const User = require('gstore-node').model('User');
const Moment = require('moment');

const router = new express.Router();
const AES_SECRET_KEY = '89v62nsh2';

const environment = process.env.NODE_ENV || 'development';

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = intl.emailError;
  }

  if (!payload || typeof payload.emailConfirm !== 'string' || 
    payload.email !== payload.emailConfirm) {
    isFormValid = false;
    errors.emailConfirm = intl.EMAIL_NOT_EQUAL;
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < Config.PASSWORD_MIN_LENGTH) {
    isFormValid = false;
    errors.password = intl.passwordNotLongEnough;
  }

  if (!payload || typeof payload.passwordConfirm !== 'string' || 
    payload.password !== payload.passwordConfirm) {
    isFormValid = false;
    errors.passwordConfirm = intl.PASSWORD_NOT_EQUAL;
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = intl.nameEmtyp;
  }

  //OOO
  // if (!payload || typeof payload.captchaCipherText !== 'string' || 
  //   CryptoJS.AES.decrypt(payload.captchaCipherText, AES_SECRET_KEY).toString(CryptoJS.enc.Utf8).toLowerCase() !== payload.captchaText.toLowerCase()) {
  //   isFormValid = false;
  //   errors.captcha = intl.captcahInputError;
  // }

  if (!isFormValid) {
    message = intl.formDataError;
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = intl.emailError;
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = intl.pwdEmpty;
  }

  //OOO
  // if (!payload || typeof payload.captchaCipherText !== 'string' ||
  //   CryptoJS.AES.decrypt(payload.captchaCipherText, AES_SECRET_KEY).toString(CryptoJS.enc.Utf8).toLowerCase() !== payload.captchaText.toLowerCase()) {
  //   isFormValid = false;
  //   errors.captcha = intl.captcahInputError;
  // }

  if (!isFormValid) {
    message = intl.formDataError;
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

function validateForgetPwdForm(payload){
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = intl.emailError;
  }

  //OOO
  // if (!payload || typeof payload.captchaCipherText !== 'string' ||
  //   CryptoJS.AES.decrypt(payload.captchaCipherText, AES_SECRET_KEY).toString(CryptoJS.enc.Utf8).toLowerCase() !== payload.captchaText.toLowerCase()) {
  //   isFormValid = false;
  //   errors.captcha = intl.captcahInputError;
  // }

  if (!isFormValid) {
    message = intl.formDataError;
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

function validateResetPwdForm(payload){
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < Config.PASSWORD_MIN_LENGTH) {
    isFormValid = false;
    errors.password = intl.passwordNotLongEnough;
  }

  if (!payload || typeof payload.passwordConfirm !== 'string' || 
    payload.password !== payload.passwordConfirm) {
    isFormValid = false;
    errors.passwordConfirm = intl.PASSWORD_NOT_EQUAL;
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

router.get('/captcha', function (req, res) {
  const captcha = svgCaptcha.create();
  const captchaInfo ={
    cipherText: CryptoJS.AES.encrypt(captcha.text, AES_SECRET_KEY).toString(),
    svgImg: captcha.data
  };
  return res.status(200).send(captchaInfo);
});

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.message === 'EmailRegistered') {
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: intl.formDataError,  
          errors: {
            email: intl.emailTaken
          }
        });
      }

      return res.status(400).json({
        success: false,
        message: intl.signupFailed
      });
    }

    return res.status(200).json({
      success: true,
      message: intl.signupCompleteGoLoginPlz
    });
  })(req, res, next); //end of passport auth

});

//response data schema:
//success: boolean
//message: success or failed message
//errors: form input fields error [opt.]
//token: jwt token [opt.]
//user: user object with name property [opt.]
router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: intl.INCORRECT_EMAIL_OR_PWD
        });
      } else if (err.name === intl.ACCOUNT_NOT_EXIST){
        return res.status(400).json({
          success: false,
          message: intl.ACCOUNT_NOT_EXIST
        });
      }
      
      return res.status(400).json({
        success: false,
        message: intl.LOGIN_FAILED
      });
    }
    
    return res.json({
      success: true,
      message: intl.loginComplte,
      token,
      user: userData
    });
  })(req, res, next);
});

router.post('/forget_pwd', (req, res, next) => {
  const validationResult = validateForgetPwdForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  const query = User.query().filter('email', '=', req.body.email);
  
  query.run().then((result) => {
    const response = result[0];
    const entities = response.entities;
    if (entities.length === 0){      
      return Promise.reject(new Error(intl.ACCOUNT_NOT_EXIST));
    }
  }).then(() =>{
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const token = {
      email: req.body.email,
      expired: Moment(tomorrow).toISOString()
    };
    const cipherToken = CryptoJS.AES.encrypt(JSON.stringify(token), AES_SECRET_KEY).toString();
    const encodedToken = encodeURIComponent(cipherToken);
    const origin = environment == 'development' ? 'http://localhost' : 'http://${Config.PRODUCTION_IP}';
    const reseturl = `${origin}/reset_pwd/${encodedToken}`;

    const mailContent =
    `<p>＊ 此信件為系統發出信件，請勿直接回覆，感謝您的配合。謝謝！＊</p>
    <p>親愛的會員 您好：</p>
    <p>這封認證信是由拼學趣發出，用以處理您忘記密碼，當您收到本「認證信函」後，請直接點選下方連結重新設置您的密碼，無需回信。</p>
    <p><a href="${reseturl}">按此認證，重設密碼</a></p>
    <p>為了確保您的會員資料安全，重設密碼的連結將於此信件寄出後24小時內後失效。</p>
    <p>如果您有任何問題，請您至拼學趣客服中心查詢相關訊息或來信給我們。</p>
    <p>拼學趣 敬上</p>`;


    Mailer.SendHtmlMail(mailContent, req.body.email, '拼學趣會員密碼認證信函', true);
    return res.end();
    
  }).catch((err) => {
    if (err.message === intl.ACCOUNT_NOT_EXIST){
      return res.status(400).json({
        success: false,
        errors: { email: intl.ACCOUNT_NOT_EXIST }
      });
    }
    return next(err);
   });
});

router.post('/reset_pwd', (req, res, next) => {
  const validationResult = validateResetPwdForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

  const tokenText = CryptoJS.AES.decrypt(req.body.token, AES_SECRET_KEY).toString(CryptoJS.enc.Utf8);
  const token = JSON.parse(tokenText);

  if (new Moment(Date()) > Moment(token.expired)) {
    return res.status(400).json({
      success: false,
      message: intl.LINK_EXPIRED
    });
  }

  const query = User.query().filter('email', '=', token.email);
  
  return query.run({ format: gstore.Queries.formats.ENTITY }).then((result) => {
    const response = result[0];
    const entities = response.entities;
    const targetUser = entities[0];
    return targetUser;
  }).then((user) => {
    user.password = req.body.password;
    return user.save();
  }).then(() => {
    return res.end();
  }).catch((err) => {
    return next(err);
   });
});

module.exports = router;
