const express = require('express');
const passport = require('passport');
const registerApi = require('./register');
const loginApi = require('./login');
const userApi = require('./users');
const logoutApi = require('./logout');
const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();

router.use(registerApi);
router.use(loginApi);

router.use(userApi);

router.use(logoutApi);

module.exports = router;
