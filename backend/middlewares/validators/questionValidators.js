const { body } = require('express-validator');

const createQuestionValidator = [
  body('question_text').notEmpty(),
  body('question_type').isIn(['mcq', 'true_false', 'type_in']),
  body('tags').optional().isArray(),
  body('options').optional().isArray(), // Required if type is 'mcq'
  body('acceptable_answers').optional().isArray(), // For 'type_in'
];

module.exports = {
  createQuestionValidator,
};
