const express = require('express');
const router = express.Router();

const authenticateJWT = require('../middlewares/auth/authenticateJWT');
const authorizeRoles = require('../middlewares/auth/authorizeRoles');
const quizController = require('../controllers/quizController');

// Create a new quiz (admin or teacher only)
router.post(
  '/',
  authenticateJWT,
  authorizeRoles('admin', 'teacher'),
  quizController.createQuiz
);

// Add one question to quiz
router.post(
  '/:quizId/questions/:questionId',
  authenticateJWT,
  authorizeRoles('teacher', 'admin'),
  quizController.addQuestionToQuiz
);

// Add multiple questions to quiz
router.post(
  '/:quizId/questions',
  authenticateJWT,
  authorizeRoles('teacher', 'admin'),
  quizController.addQuestionsToQuiz
);

// Remove one question from quiz
router.delete(
  '/:quizId/questions/:questionId',
  authenticateJWT,
  authorizeRoles('teacher', 'admin'),
  quizController.removeQuestionFromQuiz
);

// Remove multiple questions from quiz
router.delete(
  '/:quizId/questions',
  authenticateJWT,
  authorizeRoles('teacher', 'admin'),
  quizController.removeQuestionsFromQuiz
);

// Update a quiz
router.put(
  '/:quizId',
  authenticateJWT,
  authorizeRoles('admin', 'teacher'),
  quizController.updateQuiz
);

// Delete a quiz
router.delete(
  '/:quizId',
  authenticateJWT,
  authorizeRoles('admin', 'teacher'),
  quizController.deleteQuiz
);

// Get a quiz by ID (accessible to all logged in users)
router.get(
  '/:quizId',
  authenticateJWT,
  quizController.getQuizById
);

// List all quizzes (accessible to all logged in users)
router.get(
  '/',
  authenticateJWT,
  quizController.getAllQuizzes
);

module.exports = router;
