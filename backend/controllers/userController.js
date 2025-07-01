const db = require('../db/client');
const bcrypt = require('bcrypt');
const { sendOtp } = require('../utils/otpUtil'); // you must implement this

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
    current_password,
    old_password,
    new_password,
    phone,
    ...fieldsToUpdate
  } = req.body;

  try {
    // 🔍 Fetch user
    const result = await db.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });

    // 🚫 Block disallowed fields
    const disallowed = ['username', 'user_type', 'id', 'created_at', 'updated_at', 'is_verified'];
    for (const key of disallowed) {
      if (req.body.hasOwnProperty(key)) {
        return res.status(400).json({ error: `${key} cannot be updated` });
      }
    }

    // 🔐 Require current password
    const validPassword = await bcrypt.compare(current_password || '', user.password);
    if (!validPassword) {
      return res.status(403).json({ error: 'Current password is incorrect' });
    }

    // ✅ Password change flow
    if (new_password && old_password) {
      const oldMatch = await bcrypt.compare(old_password, user.password);
      if (!oldMatch) {
        return res.status(403).json({ error: 'Old password is incorrect' });
      }

      const hashed = await bcrypt.hash(new_password, 10);
      const otp = await sendOtp(user.phone, 'password_change');
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await db.query(
        `INSERT INTO otp_verifications (phone, otp, data, expires_at)
         VALUES ($1, $2, $3, $4)`,
        [user.phone, otp, { context: 'password_change', user_id: user.id, new_password: hashed }, expiresAt]
      );

      return res.status(202).json({
        message: 'OTP sent to registered phone. Verify OTP to change password.',
      });
    }

    // 📞 Phone number change flow
    if (phone && phone !== user.phone) {
      const phoneTaken = await db.query(`SELECT id FROM users WHERE phone = $1`, [phone]);
      if (phoneTaken.rowCount > 0) {
        return res.status(409).json({ error: 'Phone number already in use' });
      }

      const otp = await sendOtp(phone, 'phone_change');
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await db.query(
        `INSERT INTO otp_verifications (phone, otp, data, expires_at)
         VALUES ($1, $2, $3, $4)`,
        [phone, otp, { context: 'phone_change', user_id: user.id }, expiresAt]
      );

      return res.status(202).json({
        message: 'OTP sent to new phone. Verify OTP to update phone number.',
      });
    }

    // ✅ Normal profile field updates
    const keys = Object.keys(fieldsToUpdate);
    if (keys.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const updates = keys.map((field, idx) => `${field} = $${idx + 1}`).join(', ');
    const values = keys.map(k => fieldsToUpdate[k]);

    await db.query(
      `UPDATE users SET ${updates}, updated_at = NOW() WHERE id = $${keys.length + 1}`,
      [...values, userId]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.verifyPhoneChange = async (req, res) => {
  const userId = req.user.id;
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ error: 'Phone and OTP are required' });
  }

  try {
    // Check OTP validity and purpose
    const otpResult = await db.query(
      `SELECT * FROM otp_verifications
       WHERE phone = $1 AND otp = $2
       AND is_used = FALSE AND expires_at > NOW()
       AND data->>'purpose' = 'phone_change'
       ORDER BY created_at DESC LIMIT 1`,
      [phone, otp]
    );

    if (otpResult.rowCount === 0) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Optional: re-check phone is not already taken
    const phoneExists = await db.query(`SELECT id FROM users WHERE phone = $1 AND id != $2`, [phone, userId]);
    if (phoneExists.rowCount > 0) {
      return res.status(409).json({ error: 'Phone number already in use by another account' });
    }

    // Update phone
    await db.query(
      `UPDATE users SET phone = $1, updated_at = NOW() WHERE id = $2`,
      [phone, userId]
    );

    // Mark OTP as used
    await db.query(
      `UPDATE otp_verifications SET is_used = TRUE WHERE id = $1`,
      [otpResult.rows[0].id]
    );

    res.json({ message: 'Phone number updated successfully' });
  } catch (err) {
    console.error('verifyPhoneChange error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};



exports.verifyPasswordChange = async (req, res) => {
  const userId = req.user.id;
  const { otp, new_password } = req.body;
  console.log(otp)
  console.log(new_password)

  if (!otp || !new_password) {
    return res.status(400).json({ error: 'OTP and new password are required' });
  }

  try {
    // Check OTP validity for password change
    const otpResult = await db.query(
      `SELECT * FROM otp_verifications
       WHERE phone = (SELECT phone FROM users WHERE id = $1)
       AND otp = $2
       AND is_used = FALSE AND expires_at > NOW()
       AND data->>'purpose' = 'password_change'
       ORDER BY created_at DESC LIMIT 1`,
      [userId, otp]
    );

    if (otpResult.rowCount === 0) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Update password
    const hashed = await bcrypt.hash(new_password, 10);
    await db.query(
      `UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2`,
      [hashed, userId]
    );

    // Mark OTP as used
    await db.query(
      `UPDATE otp_verifications SET is_used = TRUE WHERE id = $1`,
      [otpResult.rows[0].id]
    );

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('verifyPasswordChange error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


