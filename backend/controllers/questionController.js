exports.getAllQuestions = async (req, res) => {
  res.json({ message: 'Get all questions route hit' });
};

exports.createQuestion = async (req, res) => {
  res.json({ message: 'Create question route hit' });
};

exports.updateQuestion = async (req, res) => {
  res.json({ message: `Update question ${req.params.questionId} route hit` });
};

exports.deleteQuestion = async (req, res) => {
  res.json({ message: `Delete question ${req.params.questionId} route hit` });
};
