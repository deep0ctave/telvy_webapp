exports.getOwnProfile = async (req, res) => {
  res.json({ message: 'Get own profile route hit' });
};

exports.updateOwnProfile = async (req, res) => {
  res.json({ message: 'Update own profile route hit' });
};

exports.getStats = async (req, res) => {
  res.json({ message: 'Get user stats route hit' });
};

exports.deleteAccount = async (req, res) => {
  res.json({ message: 'Delete account route hit' });
};

exports.getUserById = async (req, res) => {
  res.json({ message: `Get user by ID ${req.params.id} route hit` });
};

exports.getAllUsers = async (req, res) => {
  res.json({ message: 'Get all users route hit' });
};