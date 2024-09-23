const Razorpay = require('razorpay');
require('dotenv').config();

// Log environment variables
console.log('Razorpay Key ID:', process.env.RAZORPAY_KEY_ID);
console.log('Razorpay Key Secret:', process.env.RAZORPAY_KEY_SECRET);

// Initialize Razorpay instance with environment variables
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create an order for Rs. 50 (5000 paise)
const createRazorpayOrder = async () => {
    const options = {
        amount: 5000, // Rs. 50 in paise
        currency: 'INR',
        receipt: `order_rcptid_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        return order;
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        throw error;
    }
};

module.exports = { createRazorpayOrder };
