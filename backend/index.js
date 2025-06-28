// backend/index.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const quizRoutes = require('./routes/quizRoutes');
const attemptRoutes = require('./routes/attemptRoutes');
const adminRoutes = require('./routes/adminRoutes');
const miscRoutes = require('./routes/miscRoutes');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Route Mounting
console.log('Mounting user routes...');
app.use('/api/auth', authRoutes);
console.log('Mounting user routes...');
app.use('/api/users', userRoutes);
console.log('Mounting user routes...');
app.use('/api/questions', questionRoutes);
console.log('Mounting user routes...');
app.use('/api/quizzes', quizRoutes);
console.log('Mounting user routes...');
app.use('/api/attempts', attemptRoutes);
console.log('Mounting user routes...');
app.use('/api/admin', adminRoutes);
console.log('Mounting user routes...');
app.use('/api/misc', miscRoutes);

// Fallback Route
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
console.log('Mounting user routes...');

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
