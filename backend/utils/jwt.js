const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => {
  console.log(user)
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.user_type || user.role
    },
    "jaffa",
    { expiresIn: '15m'}
  );
};

exports.generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.user_type || user.role
    },
    "jaffa2",
    { expiresIn: '7d'}
  );
};

exports.verifyAccessToken = (token) => {
  return jwt.verify(token, "jaffa");
};

exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, "jaffa2");
};
