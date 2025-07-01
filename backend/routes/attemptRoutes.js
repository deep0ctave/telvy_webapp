const express = require('express');
const router = express.Router();

console.log('Mounting /api/attempts...');

const quizAttemptRoutes = require('./quizAttemptRoutes');
const questionAttemptRoutes = require('./questionAttemptRoutes');

router.use('/quiz', quizAttemptRoutes);
router.use('/question', questionAttemptRoutes);

module.exports = router;
