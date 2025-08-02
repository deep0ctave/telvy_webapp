const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => {
  console.log(user)
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.user_type || user.role
    },
    "this_is_a_quiz_app",
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' }
  );
};

exports.generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.user_type || user.role
    },
    "this_is_a_quiz_app2",
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' }
  );
};

exports.verifyAccessToken = (token) => {
  return jwt.verify(token, "this_is_a_quiz_app");
};

exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, "this_is_a_quiz_app2");
};
