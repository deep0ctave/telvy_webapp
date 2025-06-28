const express = require('express');
const router = express.Router();
const attemptController = require('../controllers/attemptController');

router.post('/quiz/:quizId/start', attemptController.startAttempt);
router.get('/quiz/:quizId/questions', attemptController.getAttemptQuestions);
router.post('/quiz/:quizId/answer', attemptController.submitAnswer);
router.post('/quiz/:quizId/submit', attemptController.submitQuiz);
router.get('/quiz/:quizId/result', attemptController.getResult);

module.exports = router;