const db = require('../db/client'); 

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM questions ORDER BY created_at DESC');
    res.json({ questions: result.rows });
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single question by ID
exports.getQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM questions WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ question: result.rows[0] });
  } catch (err) {
    console.error('Error fetching question:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a question
exports.createQuestion = async (req, res) => {
  const { question_text, question_type, tags } = req.body;
  const owner_id = req.user.id;

  try {
    const result = await db.query(
      `INSERT INTO questions (question_text, question_type, tags, owner_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [question_text, question_type, tags, owner_id]
    );

    res.status(201).json({ message: 'Question created', question: result.rows[0] });
  } catch (err) {
    console.error('Error creating question:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a question
exports.updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { question_text, question_type, tags } = req.body;

  try {
    const result = await db.query(
      `UPDATE questions
       SET question_text = $1, question_type = $2, tags = $3, updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING *`,
      [question_text, question_type, tags, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ message: 'Question updated', question: result.rows[0] });
  } catch (err) {
    console.error('Error updating question:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM questions WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    console.error('Error deleting question:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
