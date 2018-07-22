const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

// const ADMIN_GMAIL = process.env.ADMIN_GMAIL;
const MAIL_GMAIL = process.env.MAIL_GMAIL;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

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