const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {authenticateJWT} = require('../middlewares/authenticateJWT');
const {checkRole} = require('../middlewares/checkRole');

// GET all users (protected route)
router.get('/user', authenticateJWT, checkRole(['user', 'admin']), userController.getAll);

// POST create user (protected route)
// authorization (admin)
router.post('/user', authenticateJWT, checkRole('admin'), userController.create);

// GET user by ID (unprotected route)
router.get('/user/:id', userController.getOne);

// PUT update user by ID (protected route)
router.put('/user/:id', authenticateJWT, checkRole(['user', 'admin']), userController.updateOne);

// DELETE  user by ID (protected route)
router.delete('/user/:id', authenticateJWT, checkRole('admin'), userController.deleteOne);

module.exports = router;
