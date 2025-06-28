exports.getAllQuizzes = async (req, res) => {
  res.json({ message: 'Get all quizzes route hit' });
};

exports.createQuiz = async (req, res) => {
  res.json({ message: 'Create quiz route hit' });
};

exports.getQuizById = async (req, res) => {
  res.json({ message: `Get quiz ${req.params.quizId} route hit` });
};

exports.updateQuiz = async (req, res) => {
  res.json({ message: `Update quiz ${req.params.quizId} route hit` });
};

exports.deleteQuiz = async (req, res) => {
  res.json({ message: `Delete quiz ${req.params.quizId} route hit` });
};

exports.getQuizQuestions = async (req, res) => {
  res.json({ message: `Get questions for quiz ${req.params.quizId}` });
};

exports.addQuestionToQuiz = async (req, res) => {
  res.json({ message: `Add question to quiz ${req.params.quizId}` });
};

exports.removeQuestionFromQuiz = async (req, res) => {
  res.json({ message: `Remove question ${req.params.questionId} from quiz ${req.params.quizId}` });
};
