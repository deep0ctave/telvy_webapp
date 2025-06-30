const db = require('../db/client');
const bcrypt = require('bcrypt');

exports.getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await db.query(
      `SELECT id, username, phone, email, name, gender, dob, school, class, section, user_type, is_verified, created_at, updated_at 
       FROM users WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const {
    old_password,
    new_password,
    current_password,
    ...fieldsToUpdate
  } = req.body;

  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ error: 'User not found' });

    // Password update flow
    if (new_password) {
      const match = await bcrypt.compare(old_password, user.password);
      if (!match) {
        return res.status(403).json({ error: 'Old password is incorrect' });
      }
      const hashed = await bcrypt.hash(new_password, 10);
      fieldsToUpdate.password = hashed;
    } else {
      // Profile update flow (require current password)
      const match = await bcrypt.compare(current_password, user.password);
      if (!match) {
        return res.status(403).json({ error: 'Current password is incorrect' });
      }
    }

    // 🚫 Disallow dangerous fields
    const disallowedFields = ['username', 'id', 'user_type', 'is_verified', 'status', 'created_at', 'updated_at'];
    for (const key of disallowedFields) {
      delete fieldsToUpdate[key];
    }

    const keys = Object.keys(fieldsToUpdate);
    if (keys.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const updates = keys.map((field, idx) => `${field} = $${idx + 1}`).join(', ');
    const values = keys.map(key => fieldsToUpdate[key]);

    await pool.query(
      `UPDATE users SET ${updates}, updated_at = NOW() WHERE id = $${keys.length + 1}`,
      [...values, userId]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

