const express = require('express');
const router = express.Router();

const questionController = require('../controllers/questionController');
const authenticateJWT = require('../middlewares/auth/authenticateJWT');
const authorizeRoles = require('../middlewares/auth/authorizeRoles');


// Public: Get all questions
router.get('/', authenticateJWT, questionController.getAllQuestions);

// Public: Get one question
router.get('/:id', authenticateJWT, questionController.getQuestionById);

// Protected: Create question (admin/teacher)
router.post('/', authenticateJWT, authorizeRoles('admin', 'teacher'), questionController.createQuestion);

// Protected: Update question (only admin or teacher who owns it)
router.put('/:id', authenticateJWT, authorizeRoles('admin', 'teacher'), questionController.updateQuestion);

// Protected: Delete question (only admin or teacher who owns it)
router.delete('/:id', authenticateJWT, authorizeRoles('admin', 'teacher'), questionController.deleteQuestion);

module.exports = router;
module.exports = router;
