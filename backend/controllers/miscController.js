exports.getHelp = async (req, res) => {
  res.json({ message: 'Get help content' });
};

exports.submitFeedback = async (req, res) => {
  res.json({ message: 'Submit feedback' });
};

exports.getLanguages = async (req, res) => {
  res.json({ message: 'Get supported languages' });
};