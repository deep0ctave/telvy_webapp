const { body, param } = require('express-validator');

const updateProfileValidator = [
  body('name').optional().matches(/^[A-Za-z\s]+$/),
  body('school').optional().trim(),
  body('language').optional().isIn(['en', 'hi']),
];

const userIdValidator = [
  param('userId').isInt().withMessage('User ID must be numeric'),
];

module.exports = {
  updateProfileValidator,
  userIdValidator,
};
