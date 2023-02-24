const express = require('express');
const registerApi = require('./register');
const loginApi = require('./login');
const demoApi = require('./demo');

const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(demoApi);

module.exports = router;
