const nodemailer = require('nodemailer');
const winston = require('winston');
const environment = process.env.NODE_ENV || 'development';
//above codes will only execute once when first require

/**
 * @param {string} text
 * @param {string} html
 * @param {string} [mailTo='yachtingchen@gmail.com']
 * @param {string} [mailSubject='API Service (Printsheets)']
 */
function SendMail (text, html, mailTo = 'yachtingchen@gmail.com', mailSubject = 'API Service (Printsheets)', forceSendingEmailOnDev = false) {
  if (!forceSendingEmailOnDev && environment == 'development' || environment == 'test')
    return;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yachtingchenmailer@gmail.com',
      pass: 'lecsaaaf'
    }
  });

  let mailOptions = {
    from: '"Printsheets" <yachtingchenmailer@gmail.com>', // sender address
    to: mailTo, // list of receivers
    subject: mailSubject, // Subject line
    text: text || null,
    html: html || null // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return winston.error(error);
    }
    winston.info('Message %s sent: %s', info.messageId, info.response);
  });
}


/**
 * @param {any} text
 * @param {string} [mailTo='yachtingchen@gmail.com']
 * @param {string} [mailSubject='API Service (Printsheets)']
 * @param {boolean} [forceSendingEmailOnDev=false]
 */
exports.SendTextMail = (text, mailTo = 'yachtingchen@gmail.com', mailSubject = 'API Service (Printsheets)', forceSendingEmailOnDev = false) => {
  SendMail(text, null, mailTo, mailSubject, forceSendingEmailOnDev);
};

/**
 * @param {any} html
 * @param {string} [mailTo='yachtingchen@gmail.com']
 * @param {string} [mailSubject='API Service (Printsheets)']
 * @param {boolean} [forceSendingEmailOnDev=false]
 */
exports.SendHtmlMail = (html, mailTo = 'yachtingchen@gmail.com', mailSubject = 'API Service (Printsheets)', forceSendingEmailOnDev = false) => {
  SendMail(null, html, mailTo, mailSubject, forceSendingEmailOnDev);
};