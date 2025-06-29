const express = require('express');
const router = express.Router();
const questionAttemptController = require('../controllers/questionAttemptController');
const authenticateJWT = require('../middlewares/auth/authenticateJWT');

router.post(
  '/',
  authenticateJWT,
  questionAttemptController.recordAttempt
);

router.get(
  '/quiz-attempt/:quizAttemptId',
  authenticateJWT,
  questionAttemptController.getAttemptsByQuizAttempt
);


module.exports = router;
