const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST register
router.post('/register', authController.signup);

module.exports = router;
