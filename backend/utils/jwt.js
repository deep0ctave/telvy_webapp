const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

// Generate a JWT
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.user_type,
    },
    SECRET,
    { expiresIn: '1h' }
  );
}

// Verify a JWT
function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, verifyToken };
