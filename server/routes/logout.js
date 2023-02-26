const express = require('express');
const { authenticateJWT } = require('../middlewares/authenticateJWT');
const authController = require('../controllers/authController');
const router = express.Router();

// Logout
router.post('/logout', authenticateJWT, authController.logout);

module.exports = router;