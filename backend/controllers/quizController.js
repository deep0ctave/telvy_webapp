const db = require('../db/client'); // using pg.Pool
const format = require('pg-format');

// Create a quiz
exports.createQuiz = async (req, res) => {
  const { title, description, image_url, time_limit, quiz_type, tags } = req.body;
  const ownerId = req.user.id;

  try {
    const result = await db.query(
      `INSERT INTO quizzes (title, description, image_url, time_limit, quiz_type, tags, owner_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, description, image_url, time_limit, quiz_type, tags, ownerId]
    );

    res.status(201).json({ message: 'Quiz created', quiz: result.rows[0] });
  } catch (err) {
    console.error('Create quiz error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM quizzes ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
};

// Get single quiz with its questions
exports.getQuizById = async (req, res) => {
  const quizId = req.params.id;

  try {
    const quiz = await db.query('SELECT * FROM quizzes WHERE id = $1', [quizId]);
    if (!quiz.rows.length) return res.status(404).json({ message: 'Quiz not found' });

    const questions = await db.query(
      `SELECT q.*, qq.question_order
       FROM quiz_questions qq
       JOIN questions q ON q.id = qq.question_id
       WHERE qq.quiz_id = $1
       ORDER BY qq.question_order ASC`,
      [quizId]
    );

    res.json({ ...quiz.rows[0], questions: questions.rows });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving quiz' });
  }
};

// Update quiz details
exports.updateQuiz = async (req, res) => {
  const quizId = req.params.id;
  const { title, description, image_url, time_limit, quiz_type, tags } = req.body;

  try {
    const result = await db.query(
      `UPDATE quizzes SET title = $1, description = $2, image_url = $3, time_limit = $4,
       quiz_type = $5, tags = $6, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7 RETURNING *`,
      [title, description, image_url, time_limit, quiz_type, tags, quizId]
    );

    if (!result.rows.length) return res.status(404).json({ message: 'Quiz not found' });

    res.json({ message: 'Quiz updated', quiz: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Error updating quiz' });
  }
};

// Remove MULTIPLE questions from quiz
exports.removeQuestionsFromQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const { questionIds } = req.body;

    if (!Array.isArray(questionIds) || questionIds.length === 0) {
      return res.status(400).json({ message: 'questionIds must be a non-empty array' });
    }

    const deleteQuery = `
      DELETE FROM quiz_questions
      WHERE quiz_id = $1 AND question_id = ANY($2::int[])
      RETURNING *
    `;

    const result = await db.query(deleteQuery, [quizId, questionIds]);

    res.json({
      message: `${result.rowCount} question(s) removed from quiz`,
      removed: result.rows
    });
  } catch (err) {
    next(err);
  }
};

// controllers/quizController.js

exports.deleteQuiz = async (req, res, next) => {
  const { quizId } = req.params;
  const user = req.user;

  try {
    // First, fetch quiz owner (creator)
    const result = await db.query(
      'SELECT created_by FROM quizzes WHERE id = $1',
      [quizId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const quiz = result.rows[0];

    // Only allow:
    // - Admins (always allowed)
    // - Teachers only if they created the quiz
    if (user.role === 'teacher' && user.id !== quiz.created_by) {
      return res.status(403).json({ message: 'Forbidden: You can only delete your own quizzes' });
    }

    // Delete associated questions from join table
    await db.query(
      'DELETE FROM quiz_questions WHERE quiz_id = $1',
      [quizId]
    );

    // Delete the quiz itself
    await db.query(
      'DELETE FROM quizzes WHERE id = $1',
      [quizId]
    );

    res.json({ message: 'Quiz deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Add MULTIPLE questions to quiz
exports.addQuestionsToQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params;
    const { questionIds } = req.body;

    if (!Array.isArray(questionIds) || questionIds.length === 0) {
      return res.status(400).json({ message: 'questionIds must be a non-empty array' });
    }

    // Filter out already existing
    const existing = await db.query(
      `SELECT question_id FROM quiz_questions
       WHERE quiz_id = $1 AND question_id = ANY($2::int[])`,
      [quizId, questionIds]
    );

    const existingIds = existing.rows.map(row => row.question_id);
    const newIds = questionIds.filter(id => !existingIds.includes(id));

    if (newIds.length === 0) {
      return res.status(400).json({ message: 'All questions already exist in the quiz' });
    }

    const values = newIds.map(qid => `(${quizId}, ${qid})`).join(',');
    await db.query(
      `INSERT INTO quiz_questions (quiz_id, question_id)
       VALUES ${values}`
    );

    res.status(201).json({
      message: `${newIds.length} question(s) added to quiz`,
      addedQuestionIds: newIds
    });
  } catch (err) {
    next(err);
  }
};

