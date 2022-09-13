require('dotenv').config();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
       user: `${process.env.USER_TRANSPORT}`,
       pass: `${process.env.PASS_TRANSPORT}`
    }
});


module.exports = transporter;