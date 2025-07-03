import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const mockAttemptResult = {
  questions: [
    {
      id: 1,
      question_text: "What is 2 + 2?",
      question_type: "mcq",
      options: ["2", "3", "4", "5"],
      correct_answer: "4",
      selected_answer: "4",
    },
    {
      id: 2,
      question_text: "The sky is blue. (True/False)",
      question_type: "true_false",
      options: ["True", "False"],
      correct_answer: "True",
      selected_answer: "False",
    },
    {
      id: 3,
      question_text: "Name the capital of India.",
      question_type: "type_in",
      correct_answer: "New Delhi",
      selected_answer: "",
    },
  ],
};

const AttemptResult = () => {
  const { attemptId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Simulate fetch
    setQuestions(mockAttemptResult.questions);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const getAnswerClass = (option, question) => {
    const { selected_answer, correct_answer } = question;
    if (selected_answer === "") return "bg-base-200";

    if (option === correct_answer && option === selected_answer) {
      return "border border-green-500";
    }
    if (option === selected_answer && selected_answer !== correct_answer) {
      return "border border-red-500";
    }
    if (option === correct_answer) {
      return "border border-green-300";
    }
    return "bg-base-100";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Attempt Result</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Question section */}
        <div className="flex-1 space-y-4">
          {currentQuestion && (
            <div className="card bg-base-200 border border-base-300 shadow">
              <div className="card-body space-y-4">
                <h2 className="card-title">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </h2>
                <p className="text-lg">{currentQuestion.question_text}</p>

                <div className="space-y-2">
                  {/* MCQ / True False */}
                  {(currentQuestion.question_type === "mcq" ||
                    currentQuestion.question_type === "true_false") &&
                    currentQuestion.options.map((opt, idx) => (
                      <label
                        key={idx}
                        className={`flex items-center gap-2 rounded px-3 py-2 ${getAnswerClass(
                          opt,
                          currentQuestion
                        )}`}
                      >
                        <input
                          type="radio"
                          disabled
                          name={`q-${currentQuestion.id}`}
                          className="radio"
                          checked={currentQuestion.selected_answer === opt}
                          readOnly
                        />
                        <span>{opt}</span>
                      </label>
                    ))}

                  {/* Type-in */}
                  {currentQuestion.question_type === "type_in" && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        value={currentQuestion.selected_answer}
                        disabled
                      />
                      <p className="text-sm text-green-600">
                        Correct Answer: {currentQuestion.correct_answer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <button
              className="btn"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((i) => i - 1)}
            >
              Previous
            </button>
            <button
              className="btn"
              disabled={currentQuestionIndex === questions.length - 1}
              onClick={() => setCurrentQuestionIndex((i) => i + 1)}
            >
              Next
            </button>
          </div>
        </div>

        {/* Right navigator */}
        <div className="w-full lg:w-64 shrink-0 bg-base-100 border border-base-300 rounded-box p-4 shadow">
          <h3 className="font-semibold text-center mb-2">Navigate</h3>
          <div className="grid grid-cols-5 gap-2 justify-center">
            {questions.map((q, i) => {
              const attempted = !!q.selected_answer;
              const isCorrect = q.selected_answer === q.correct_answer;

              return (
                <button
                  key={q.id}
                  className={`btn btn-xs ${
                    i === currentQuestionIndex
                      ? "btn-primary"
                      : !attempted
                      ? "btn-ghost"
                      : isCorrect
                      ? "btn-success"
                      : "btn-error"
                  }`}
                  onClick={() => setCurrentQuestionIndex(i)}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttemptResult;
