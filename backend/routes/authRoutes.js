const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidationRules, validate } = require('../middlewares/validators/validateRegisterInput');

router.post('/register/initiate', registerValidationRules, validate, authController.registerInitiate);
router.post('/register/verify-otp', authController.registerVerify);
router.post('/login', authController.login);
router.post('/register/resend', authController.resendOtp);

module.exports = router;