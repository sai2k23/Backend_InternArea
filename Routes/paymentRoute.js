// paymentRoute.js
const express = require('express');
const { sendOTPEmail, generateOTP } = require('../emailService');
const { createRazorpayOrder } = require('../razorpayService');

const router = express.Router();

// In-memory store for OTPs (consider Redis/DB for production)
let otpStore = {};

// Step 1: Send OTP to user's email
router.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const otp = generateOTP(); // Generate OTP
    otpStore[email] = otp; // Store OTP for email temporarily

    await sendOTPEmail(email, otp); // Send OTP via email
    res.status(200).json({ message: 'OTP sent successfully to ' + email });
});

// Step 2: Verify OTP and proceed to payment
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const storedOTP = otpStore[email];

    if (!storedOTP) {
        return res.status(400).json({ error: 'No OTP found for this email' });
    }

    if (storedOTP != otp) {
        return res.status(400).json({ error: 'Invalid OTP' });
    }

    // OTP is valid, create Razorpay order
    try {
        const order = await createRazorpayOrder();
        res.status(200).json({ message: 'OTP verified', order });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create Razorpay order' });
    }
});

module.exports = router;
