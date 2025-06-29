const { body } = require('express-validator');

const dobValidator = body('dob')
  .isDate().withMessage('Invalid date format')
  .custom((value) => {
    const dob = new Date(value);
    const now = new Date();

    if (dob > now) throw new Error('Date of birth cannot be in the future');

    const age = now.getFullYear() - dob.getFullYear();
    const isBeforeBirthday =
      now.getMonth() < dob.getMonth() ||
      (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate());
    const actualAge = isBeforeBirthday ? age - 1 : age;

    if (actualAge > 100) throw new Error('Age cannot be more than 100 years');
    if (actualAge < 5) throw new Error('Minimum age is 5');

    return true;
  });

const registrationValidator = [
  body('username').trim().isLength({ min: 3 }).withMessage('Username too short'),
  body('password').isStrongPassword().withMessage('Weak password'),
  body('phone').matches(/^\+91\d{10}$/).withMessage('Invalid Indian phone number'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('name').matches(/^[A-Za-z\s]+$/).withMessage('Name must contain only letters and spaces'),
  body('user_type').isIn(['student', 'teacher', 'admin']),
  body('school').optional().trim(),
  body('class').optional().trim(),
  body('section').optional().trim(),
  dobValidator,
];

const otpVerificationValidator = [
  body('phone').matches(/^\+91\d{10}$/).withMessage('Invalid phone'),
  body('otp').isLength({ min: 4, max: 6 }).withMessage('Invalid OTP'),
];

const loginValidator = [
  body('username').notEmpty(),
  body('password').notEmpty(),
];

module.exports = {
  registrationValidator,
  otpVerificationValidator,
  loginValidator,
};
