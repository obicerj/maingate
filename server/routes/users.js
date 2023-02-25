const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const authenticateJWT = require('../middlewares/authenticateJWT');

// GET all users (protected route)
router.get('/user', authenticateJWT, userController.getAll);

// POST 
// router.post('/user', authenticateJWT, userController.create);

// GET user by ID (unprotected route)
router.get('/user/:id', userController.getOne);

// PUT update user by ID (protected route)
router.put('/user/:id', authenticateJWT, userController.updateOne);

// DELETE  user by ID (protected route)
router.delete('/user/:id', authenticateJWT, userController.deleteOne);

module.exports = router;
