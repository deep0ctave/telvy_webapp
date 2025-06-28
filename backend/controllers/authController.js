const pool = require('../db/client'); // adjust path as needed
const bcrypt = require('bcrypt');

// Generate random 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.sendOtp = async (req, res) => {
  try {
    const {
      username, phone, email, password,
      name, gender, dob, school, class: academicClass,
      section, user_type
    } = req.body;

    // Check if user exists
    const userCheck = await pool.query(
      `SELECT * FROM users WHERE phone = $1 OR email = $2 OR username = $3`,
      [phone, email, username]
    );

    if (userCheck.rows.length > 0) {
      return res.status(409).json({ error: 'User with phone/email/username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();

    const userData = {
      username,
      phone,
      email,
      password: hashedPassword,
      name,
      gender,
      dob,
      school,
      class: academicClass,
      section,
      user_type
    };

    await pool.query(
      `INSERT INTO otp_verifications (phone, otp, data, expires_at)
       VALUES ($1, $2, $3, NOW() + INTERVAL '10 minutes')`,
      [phone, otp, userData]
    );

    console.log(`📱 OTP for ${phone}: ${otp}`); // Simulate SMS sending

    res.status(200).json({ message: 'OTP sent to phone' });
  } catch (err) {
    console.error('Error in sendOtp:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.register = async (req, res) => {
  res.json({ message: 'Register route hit' });
};

exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM otp_verifications
       WHERE phone = $1 AND otp = $2 AND is_used = FALSE AND expires_at > NOW()
       ORDER BY created_at DESC LIMIT 1`,
      [phone, otp]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    const record = result.rows[0];
    const userData = record.data;

    // Create user
    const userInsert = await pool.query(
      `INSERT INTO users (
        username, phone, email, password, name, gender, dob,
        school, class, section, user_type, is_verified
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,TRUE)
      RETURNING id, username, user_type`,
      [
        userData.username,
        userData.phone,
        userData.email,
        userData.password,
        userData.name,
        userData.gender,
        userData.dob,
        userData.school,
        userData.class,
        userData.section,
        userData.user_type
      ]
    );

    await pool.query(
      `UPDATE otp_verifications SET is_used = TRUE WHERE id = $1`,
      [record.id]
    );

    res.status(201).json({
      message: 'User verified and registered successfully',
      user: userInsert.rows[0]
    });
  } catch (err) {
    console.error('Error in verifyOtp:', err);
    res.status(500).json({ error: 'Server error' });
  }
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