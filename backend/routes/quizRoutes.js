const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/', quizController.getAllQuizzes);
router.post('/', quizController.createQuiz);
router.get('/:quizId', quizController.getQuizById);
router.put('/:quizId', quizController.updateQuiz);
router.delete('/:quizId', quizController.deleteQuiz);

// Nested quiz questions
router.get('/:quizId/questions', quizController.getQuizQuestions);
router.post('/:quizId/questions', quizController.addQuestionToQuiz);
router.delete('/:quizId/questions/:questionId', quizController.removeQuestionFromQuiz);

module.exports = router;