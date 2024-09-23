// emailService.js
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

// Generate a 6-digit OTP
const generateOTP = () => {
    return crypto.randomInt(100000, 999999);
}

// Create a transporter for sending emails using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

// Function to send OTP via email
const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Your OTP for Payment Verification',
        text: `Your OTP for verification is: ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully to:', email);
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
};

module.exports = { sendOTPEmail, generateOTP };
