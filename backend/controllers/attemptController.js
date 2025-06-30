const db = require('../db/client');

exports.startAttempt = async (req, res) => {
  const userId = req.user.id;
  const { quizId } = req.body;

  try {
    // Prevent multiple active attempts for same quiz
    const existing = await db.query(
      `SELECT * FROM quiz_attempts 
       WHERE user_id = $1 AND quiz_id = $2 AND is_completed = false`,
      [userId, quizId]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Attempt already in progress' });
    }

    const result = await db.query(
      `INSERT INTO quiz_attempts (user_id, quiz_id) 
       VALUES ($1, $2) RETURNING *`,
      [userId, quizId]
    );

    res.status(201).json({
      message: 'Quiz attempt started',
      attempt: result.rows[0],
    });
  } catch (err) {
    console.error('Error starting attempt:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.submitAttempt = async (req, res) => {
  const userId = req.user.id;
  const { attemptId, answers } = req.body;

  try {
    // Verify attempt
    const attempt = await db.query(
      `SELECT * FROM quiz_attempts WHERE id = $1 AND user_id = $2`,
      [attemptId, userId]
    );

    if (attempt.rows.length === 0) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    if (attempt.rows[0].is_completed) {
      return res.status(400).json({ message: 'Quiz already submitted' });
    }

    let correct = 0;

    for (const ans of answers) {
      const { questionId, selectedOptionId, typedAnswer } = ans;

      let isCorrect = false;

      if (selectedOptionId) {
        const option = await db.query(
          `SELECT is_correct FROM options WHERE id = $1 AND question_id = $2`,
          [selectedOptionId, questionId]
        );
        isCorrect = option.rows[0]?.is_correct || false;
      }

      if (typedAnswer) {
        const accepted = await db.query(
          `SELECT * FROM accepted_answers 
           WHERE question_id = $1 AND LOWER(acceptable_answer) = LOWER($2)`,
          [questionId, typedAnswer]
        );
        isCorrect = accepted.rows.length > 0;
      }

      if (isCorrect) correct++;

      await db.query(
        `INSERT INTO question_attempts 
         (user_id, quiz_id, question_id, selected_option_id, typed_answer, is_correct) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [userId, attempt.rows[0].quiz_id, questionId, selectedOptionId || null, typedAnswer || null, isCorrect]
      );
    }

    await db.query(
      `UPDATE quiz_attempts 
       SET is_completed = true, submitted_at = CURRENT_TIMESTAMP, score = $1 
       WHERE id = $2`,
      [correct, attemptId]
    );

    res.status(200).json({
      message: 'Quiz submitted successfully',
      score: correct,
    });
  } catch (err) {
    console.error('Error submitting attempt:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// controllers/attemptController.js

exports.getAttemptById = async (req, res) => {
  const userId = req.user.id;
  const attemptId = req.params.id;

  try {
    const attemptRes = await db.query(
      `SELECT * FROM quiz_attempts WHERE id = $1 AND user_id = $2`,
      [attemptId, userId]
    );

    if (attemptRes.rows.length === 0) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    const questionsRes = await db.query(
      `SELECT question_id, selected_option_id, typed_answer, is_correct 
       FROM question_attempts 
       WHERE quiz_id = $1 AND user_id = $2`,
      [attemptRes.rows[0].quiz_id, userId]
    );

    res.status(200).json({
      attempt: attemptRes.rows[0],
      questions: questionsRes.rows,
    });
  } catch (err) {
    console.error('Error fetching attempt:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// controllers/attemptController.js

exports.getAttemptsByUser = async (req, res) => {
  const requestUserId = req.user.id;
  const requestUserRole = req.user.role;
  const { userId } = req.params;

  const isSelf = parseInt(userId) === requestUserId;
  const isPrivileged = requestUserRole === 'admin' || requestUserRole === 'teacher';

  if (!isSelf && !isPrivileged) {
    return res.status(403).json({ message: 'Forbidden: Not authorized to view these attempts' });
  }

  try {
    const result = await db.query(
      `SELECT * FROM quiz_attempts WHERE user_id = $1 ORDER BY submitted_at DESC`,
      [userId]
    );

    res.status(200).json({ attempts: result.rows });
  } catch (err) {
    console.error('Error fetching attempts:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

