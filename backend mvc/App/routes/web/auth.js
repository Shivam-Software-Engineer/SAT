let express=require('express');
const { otpRouter, sendOtp, verifyOtp } = require('../../controllers/web/otp');

let authentication=express.Router()


authentication.post('/send-otp', sendOtp);
authentication.post('/verify-otp', verifyOtp);

module.exports={authentication}


//http://localhost:8000/website/auth/send-otp
//http://localhost:8000/website/auth/verify-otp
