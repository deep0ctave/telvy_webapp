import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const mockQuestions = [
  {
    id: 1,
    question_text: "What is 2 + 2?",
    question_type: "mcq",
    options: ["2", "3", "4", "5"],
  },
  {
    id: 2,
    question_text: "The sky is blue. (True/False)",
    question_type: "true_false",
    options: ["True", "False"],
  },
  {
    id: 3,
    question_text: "Name the capital of India.",
    question_type: "type_in",
    options: [],
  },
];

const LiveAttempt = () => {
  const { attemptId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    setQuestions(mockQuestions);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOptionSelect = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    alert("Quiz submitted!");
    // You can navigate or save here
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = ((300 - timeLeft) / 300) * 100;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Question panel */}
        <div className="flex-1 space-y-4">
          {/* Timer */}
          <div>
            <progress
              className="progress progress-primary w-full mb-1"
              value={progressPercent}
              max="100"
            ></progress>
            <div className="text-right text-sm font-mono">{formatTime(timeLeft)}</div>
          </div>

          <div className="card bg-base-200 border border-base-300 shadow">
            <div className="card-body space-y-4">
              <h2 className="card-title">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h2>
              <p className="text-lg">{currentQuestion?.question_text}</p>

              <div className="space-y-2">
                {/* MCQ or True/False options */}
                {(currentQuestion?.question_type === "mcq" ||
                  currentQuestion?.question_type === "true_false") &&
                  (currentQuestion.options || []).map((opt, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center gap-3 px-3 py-2 rounded border cursor-pointer ${
                        answers[currentQuestion.id] === opt
                          ? "border-primary"
                          : "border-base-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${currentQuestion.id}`}
                        className="radio"
                        checked={answers[currentQuestion.id] === opt}
                        onChange={() => handleOptionSelect(currentQuestion.id, opt)}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}

                {/* Type-in */}
                {currentQuestion?.question_type === "type_in" && (
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) =>
                      handleOptionSelect(currentQuestion.id, e.target.value)
                    }
                  />
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              className="btn"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((i) => i - 1)}
            >
              Previous
            </button>

            {currentQuestionIndex === questions.length - 1 ? (
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit Quiz
              </button>
            ) : (
              <button
                className="btn"
                onClick={() => setCurrentQuestionIndex((i) => i + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Navigator */}
        <div className="w-full lg:w-64 shrink-0 bg-base-100 border border-base-300 rounded-box p-4 shadow">
          <h3 className="font-semibold text-center mb-2">Navigate</h3>
          <div className="grid grid-cols-5 gap-2 justify-center">
            {questions.map((q, i) => (
              <button
                key={q.id}
                className={`btn btn-xs ${
                  i === currentQuestionIndex
                    ? "btn-primary"
                    : answers[q.id]
                    ? "btn-info"
                    : "btn-outline"
                }`}
                onClick={() => setCurrentQuestionIndex(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAttempt;
