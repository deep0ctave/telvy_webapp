const express = require('express');
const router = express.Router();

const questionController = require('../controllers/questionController');
const authenticateJWT = require('../middlewares/auth/authenticateJWT');
const authorizeRole = require('../middlewares/auth/authorizeRoles');

// Public - anyone logged in can view
router.get('/', authenticateJWT, questionController.getAllQuestions);
router.get('/:id', authenticateJWT, questionController.getQuestionById);

// Restricted - only teacher/admin can create/update/delete
router.post('/', authenticateJWT, authorizeRole('teacher', 'admin'), questionController.createQuestion);
router.put('/:id', authenticateJWT, authorizeRole('teacher', 'admin'), questionController.updateQuestion);
router.delete('/:id', authenticateJWT, authorizeRole('teacher', 'admin'), questionController.deleteQuestion);

module.exports = router;
