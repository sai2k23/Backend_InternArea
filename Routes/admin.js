// admin.js
const express = require('express');
const router = express.Router();

// Admin login route
router.post('/api/admin/adminLogin', (req, res) => {
    const { username, password } = req.body;
    
    // Add your logic for authentication
    if (username === 'admin' && password === 'password') {
        res.status(200).json({ message: 'Admin login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
