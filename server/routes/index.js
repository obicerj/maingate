const express = require('express');
const passport = require('passport');
const registerApi = require('./register');
const loginApi = require('./login');
const userApi = require('./users');
const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();

router.use(registerApi);
router.use(loginApi);

router.use(userApi);

router.post('/logout', authenticateJWT, (req, res) => {
  res.json({ message: 'User logged out successfully' });
});

module.exports = router;
