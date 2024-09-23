const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
const NodeCache = require("node-cache")

dotenv.config({
  path: "../.env",
});

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // Replace with your email provider
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_ADDRESS, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: `"Hello World Social" <${process.env.EMAIL_ADDRESS}>`, // Sender address
    to: to, // List of recipients
    subject: "OTP Verification", // Subject line
    text: `Your OTP code is ${otp}`, // Plain text body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return false;
  }
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

const otpCache = new NodeCache({ stdTTL: 3000 }); // TTL of 3 minutes
// Save OTP
const saveOTP = (email, otp) => {
  otpCache.set(email, otp);
};

// Verify OTP
const verifyOTP = (email, userOtp) => {
  const otp = otpCache.get(email);
  console.log(otp);

  if (otp == userOtp) {
    otpCache.del(email); // Free up storage after successful verification
    return true;
  }
  return false;
};

module.exports =  { sendOtpEmail, generateOTP, saveOTP, verifyOTP  };
