const { body, validationResult } = require('express-validator');

exports.registerValidationRules = [
  body('username').isAlphanumeric().isLength({ min: 3, max: 30 }).trim(),
  body('phone').isMobilePhone().trim(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty().trim(),
  body('gender').isIn(['male', 'female', 'other']),
  body('dob').isISO8601(),
  body('school').notEmpty().trim(),
  body('class').notEmpty().trim(),
  body('section').notEmpty().trim(),
  body('user_type').isIn(['student', 'teacher', 'admin']),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
