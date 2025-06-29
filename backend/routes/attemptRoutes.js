const express = require('express');
const router = express.Router();
const attemptController = require('../controllers/attemptController');
const authenticateJWT = require('../middlewares/auth/authenticateJWT');

router.post('/start', authenticateJWT, attemptController.startAttempt);
router.post('/submit', authenticateJWT, attemptController.submitAttempt);
router.get('/:id', authenticateJWT, attemptController.getAttemptById);
router.get('/user/:userId', authenticateJWT, attemptController.getAttemptsByUser);

module.exports = router;