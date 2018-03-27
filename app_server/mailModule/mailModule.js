const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

// const ADMIN_GMAIL = 'kyrylenko.vadym@gmail.com';
const MAIL_GMAIL = 'test.email.kaa@gmail.com';
const MAIL_PASSWORD = 'qwe123456qwe';

module.exports.transporter = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
        user: MAIL_GMAIL,
        pass: MAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
}));

module.exports.regConfirmationEmail = function (data) {
    return {
        from: MAIL_GMAIL,
        to: data.mail,
        cc: '',
        subject: data.subject,
        html: data.message,
        attachments: []
    };
};

/*
// потом я заимпортил их в контроллер
let transporter = mailModule.transporter;
let regConfirmationEmail = mailModule.regConfirmationEmail;

// в самом контроллере определяешь переменную
let confirmation = {
  mail:  ,
  subject: '',
  message: '',
};

transporter.sendMail(regConfirmationEmail(confirmation), function (error, info) {
  if (error) {
    console.log(error);
  }
  console.log('Confirmation message sent to: ', user.eMail);
});
*/
