const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/profile', userController.getOwnProfile);
router.put('/profile', userController.updateOwnProfile);
router.get('/stats', userController.getStats);
router.delete('/delete', userController.deleteAccount);
router.get('/:id/profile', userController.getUserById);
router.get('/', userController.getAllUsers);

module.exports = router;