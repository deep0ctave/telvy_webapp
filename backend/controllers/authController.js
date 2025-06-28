exports.register = async (req, res) => {
  res.json({ message: 'Register route hit' });
};

exports.verifyOtp = async (req, res) => {
  res.json({ message: 'Verify OTP route hit' });
};

exports.resendOtp = async (req, res) => {
  res.json({ message: 'Resend OTP route hit' });
};

exports.login = async (req, res) => {
  res.json({ message: 'Login route hit' });
};

exports.logout = async (req, res) => {
  res.json({ message: 'Logout route hit' });
};

exports.getMe = async (req, res) => {
  res.json({ message: 'Get current user route hit' });
};