const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middlewares/auth/authenticateJWT');

console.log("Working")
router.get('/me', authenticateJWT, userController.getProfile);
console.log("Working")
router.put('/me', authenticateJWT, userController.updateProfile);
router.get('/stats', userController.getStats);
router.delete('/delete', userController.deleteAccount);
router.get('/:id/profile', userController.getUserById);
router.get('/', userController.getAllUsers);

module.exports = router;