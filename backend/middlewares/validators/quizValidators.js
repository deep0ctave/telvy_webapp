const { body } = require('express-validator');

const createQuizValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional(),
  body('time_limit').isInt({ min: 1 }).withMessage('Time limit must be a number (minutes)'),
  body('quiz_type').isIn(['live', 'scheduled', 'anytime']),
  body('tags').optional().isArray(),
  body('question_ids').isArray({ min: 1 }).withMessage('At least one question is required'),
];

module.exports = {
  createQuizValidator,
};
