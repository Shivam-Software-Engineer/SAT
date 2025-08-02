const nodemailer = require("nodemailer");
require('dotenv').config(); // Load environment variables

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.Email_template,
    pass: process.env.Email_password,
  },
});

module.exports={transporter}
