// controllers/userController.js
const db = require('../db/client');

exports.getProfile = async (req, res, next) => {
  try {
    const { id } = req.user;

    const result = await db.query(
      `SELECT id, username, name, email, phone, gender, dob, school, class, section, user_type, profile_image
       FROM users
       WHERE id = $1 AND status = 'active'`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found or deactivated' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      name,
      gender,
      dob,
      school,
      class: academicClass,
      section,
      profile_image,
      language,
    } = req.body;

    const result = await db.query(
      `UPDATE users
       SET name = $1,
           gender = $2,
           dob = $3,
           school = $4,
           class = $5,
           section = $6,
           profile_image = $7,
           language = $8,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING id, username, name, email, phone, gender, dob, school, class, section, user_type, profile_image, language`,
      [
        name,
        gender,
        dob,
        school,
        academicClass,
        section,
        profile_image,
        language,
        userId,
      ]
    );

    res.json({
      message: 'Profile updated successfully',
      user: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
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