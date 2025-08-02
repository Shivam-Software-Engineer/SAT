// ✅ File: controllers/web/otp.js
const axios = require("axios");
require('dotenv').config(); // at top of your file
const { transporter } = require('../../Config/mailConfig'); // Adjust path as needed

const OTP_STORE = {}; // temporary in-memory store


const SMS_API_URL = process.env.BHASH_SMS_API_URL;
const SMS_USER = process.env.BHASH_SMS_USER ; // default to 'success' if not set
const SMS_PASS = process.env.BHASH_SMS_PASS ; // default to 'sms@1234' if not set
const SMS_SENDER = process.env.BHASH_SMS_SENDER; // default to '' if not set

// console.log("SMS API URL:", SMS_API_URL);
// ➤ Send OTP Controller
const sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ status: 0, message: "Phone is required" });

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  const text = `Dear Customer, OTP is ${otp}, Thank you for using our service.- BhashSMS expire in 5 minute`;

  console.log(`Sending OTP ${otp} to ${phone}`);
  try {
    const response = await axios.get(SMS_API_URL, {
      params: {
        user: SMS_USER,
        pass: SMS_PASS,
        sender: SMS_SENDER,
        phone,
        text,
        priority: "ndnd",
        stype: "normal"
      }
    });

    OTP_STORE[phone] = otp;
    setTimeout(() => delete OTP_STORE[phone], 5 * 60 * 1000); // auto-expire in 5 min

    return res.json({ status: 1, message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ status: 0, message: "SMS failed", error: error.message });
  }
};

// ➤ Verify OTP Controller
const verifyOtp = async (req, res) => {
  const { phone, otp, email } = req.body;

  if (!phone || !otp || !email) {
    return res.status(400).json({ status: 0, message: "Phone, OTP, and Email required" });
  }

  if (OTP_STORE[phone] && OTP_STORE[phone] == otp) {
    delete OTP_STORE[phone];

    try {
      const mailOptions = {
        from: `"Maxiwise Learning" <${process.env.Email_template}>`,
        to: email,
        subject: "Mobile Verification Successful ✅",
        html: `
  <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
    <div style="background-color: #4a00e0; color: white; padding: 20px; text-align: center;">
      <h1 style="margin: 0;">Maxiwise</h1>
      <p style="margin: 5px 0 0;">Smart Solutions, Smarter Future</p>
    </div>

    <div style="padding: 30px; background-color: #fafafa;">
      <h2 style="color: #333;">Hi there!</h2>
      <p style="font-size: 16px; color: #555;">
        Your mobile number <strong>${phone}</strong> has been <strong style="color: green;">successfully verified</strong>. 🎉
      </p>

      <p style="font-size: 16px; color: #555;">
        Thank you for showing interest in <strong>Maxiwise</strong>. We're excited to have you on board!
      </p>

      <p style="font-size: 16px; color: #555;">
        One of our team members will get in touch with you shortly to guide you through the next steps.
      </p>

      <p style="font-size: 16px; color: #555;">If you have any questions, feel free to reply to this email.</p>

      <div style="margin-top: 30px; text-align: center;">
        <a href="https://www.maxiwise.com" style="background: #4a00e0; color: white; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-size: 16px;">Visit Our Website</a>
      </div>
    </div>

    <div style="background-color: #f0f0f0; text-align: center; padding: 20px; font-size: 14px; color: #888;">
      &copy; ${new Date().getFullYear()} Maxiwise. All rights reserved.<br/>
      <a href="mailto:support@maxiwise.com" style="color: #4a00e0; text-decoration: none;">support@maxiwise.com</a>
    </div>
  </div>
`
,
      };

      await transporter.sendMail(mailOptions);

      return res.json({
        status: 1,
        message: "OTP verified and confirmation email sent",
      });
    } catch (err) {
      console.error("Email Error:", err);
      return res.status(500).json({
        status: 0,
        message: "OTP verified but email sending failed",
        error: err.message,
      });
    }
  }

  return res.status(400).json({ status: 0, message: "Invalid or expired OTP" });
};

module.exports = {
  sendOtp,
  verifyOtp
};
