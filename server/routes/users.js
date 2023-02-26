const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authenticateJWT, authorizeRole} = require('../middlewares/authenticateJWT');

// GET all users (protected route)
router.get('/user', authenticateJWT, userController.getAll);

// POST create user (protected route)
// authorization (admin)
router.post('/user', authenticateJWT, authorizeRole(['admin']), userController.create);

// GET user by ID (unprotected route)
router.get('/user/:id', userController.getOne);

// PUT update user by ID (protected route)
router.put('/user/:id', authenticateJWT, userController.updateOne);

// DELETE  user by ID (protected route)
router.delete('/user/:id', authenticateJWT, userController.deleteOne);

module.exports = router;
