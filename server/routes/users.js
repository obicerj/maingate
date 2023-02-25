const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/user', userController.getAll);
router.get('/user/:id', userController.getOne);
router.put('/user/:id', userController.updateOne);
router.delete('/user/:id', userController.deleteOne);

module.exports = router;
