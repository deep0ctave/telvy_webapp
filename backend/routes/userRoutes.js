const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middlewares/auth/authenticateJWT');

router.get('/me', authenticateJWT, userController.getProfile);
router.put('/me', authenticateJWT, userController.updateProfile);

module.exports = router;