exports.startAttempt = async (req, res) => {
  res.json({ message: `Start quiz attempt for quiz ${req.params.quizId}` });
};

exports.getAttemptQuestions = async (req, res) => {
  res.json({ message: `Get attempt questions for quiz ${req.params.quizId}` });
};

exports.submitAnswer = async (req, res) => {
  res.json({ message: `Submit answer for quiz ${req.params.quizId}` });
};

exports.submitQuiz = async (req, res) => {
  res.json({ message: `Submit quiz ${req.params.quizId}` });
};

exports.getResult = async (req, res) => {
  res.json({ message: `Get result for quiz ${req.params.quizId}` });
};