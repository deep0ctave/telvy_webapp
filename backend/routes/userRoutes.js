const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middlewares/auth/authenticateJWT');
const validate = require('../middlewares/validationHandler');
const validators = require('../middlewares/validators/validationRules');

router.get('/profile', authenticateJWT, userController.getProfile);
router.put('/profile', authenticateJWT, validators.profileUpdateValidation, validate, userController.updateProfile);

router.post('/verify-phone-change', authenticateJWT, userController.verifyPhoneChange);
router.post('/verify-password-change', authenticateJWT, userController.verifyPasswordChange);

module.exports = router;