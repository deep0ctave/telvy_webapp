const db = require('../db/client');

exports.getAllQuestions = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM questions ORDER BY created_at DESC');
    res.status(200).json({ questions: result.rows });
  } catch (err) {
    next(err);
  }
};

exports.getQuestionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM questions WHERE id = $1', [id]);

    if (result.rowCount === 0) return res.status(404).json({ message: 'Question not found' });

    res.status(200).json({ question: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.createQuestion = async (req, res, next) => {
  try {
    const { question_text, question_type, tags, question_image } = req.body;
    const owner_id = req.user.id;

    const result = await db.query(
      `INSERT INTO questions (question_text, question_type, tags, question_image, owner_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [question_text, question_type, tags, question_image, owner_id]
    );

    res.status(201).json({ message: 'Question created', question: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.updateQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { question_text, question_type, tags, question_image } = req.body;
    const userId = req.user.id;
    const role = req.user.role;

    const existing = await db.query('SELECT * FROM questions WHERE id = $1', [id]);

    if (existing.rowCount === 0)
      return res.status(404).json({ message: 'Question not found' });

    const question = existing.rows[0];

    if (role === 'teacher' && question.owner_id !== userId) {
      return res.status(403).json({ message: 'Unauthorized: Not your question' });
    }

    const result = await db.query(
      `UPDATE questions SET
         question_text = $1,
         question_type = $2,
         tags = $3,
         question_image = $4,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $5 RETURNING *`,
      [question_text, question_type, tags, question_image, id]
    );

    res.status(200).json({ message: 'Question updated', question: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.deleteQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    const existing = await db.query('SELECT * FROM questions WHERE id = $1', [id]);

    if (existing.rowCount === 0)
      return res.status(404).json({ message: 'Question not found' });

    const question = existing.rows[0];

    if (role === 'teacher' && question.owner_id !== userId) {
      return res.status(403).json({ message: 'Unauthorized: Not your question' });
    }

    await db.query('DELETE FROM questions WHERE id = $1', [id]);

    res.status(200).json({ message: 'Question deleted' });
  } catch (err) {
    next(err);
  }
};
