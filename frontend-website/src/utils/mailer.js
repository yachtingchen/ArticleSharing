const nodemailer = require('nodemailer');
const winston = require('winston');
const environment = process.env.NODE_ENV || 'development';

module.exports = (message) => {
    if (environment == 'development')
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
        from: '"Printsheets Mailer" <yachtingchenmailer@gmail.com>', // sender address
        to: 'yachtingchen@gmail.com', // list of receivers
        subject: 'React Service (Printsheets)', // Subject line
        text: message, // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return winston.error(error);
        }
        winston.error('Message %s sent: %s', info.messageId, info.response);
    });
};