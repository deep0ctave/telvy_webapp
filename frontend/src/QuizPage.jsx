import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Main Quiz Page Component
export default function QuizPage() {
  const { id } = useParams(); // get quiz ID from URL
  const [quizData, setQuizData] = useState(null);
  const [currentStep, setCurrentStep] = useState("info"); // info | question | end
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  // Dummy quiz data, simulating fetch on mount or id change
  useEffect(() => {
    const dummyQuiz = {
      id,
      title: "React Fundamentals",
      description: "Test your knowledge on core concepts of React.",
      image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      status: "done", // "scheduled" | "done"
      userStatus: "not_attempted", // "attempted" | "attempting"
      difficulty: "Medium",
      tags: ["React", "JavaScript", "Frontend"],
      timeLimit: 5 * 60,
      scheduledTime: new Date(Date.now() + 60000 * 2), // +2 mins for test
    };
    setQuizData(dummyQuiz);
  }, [id]);

  const questions = [
    {
      id: "q1",
      type: "mcq",
      text: "What is the primary purpose of useEffect in React?",
      difficulty: "Easy",
      time: 60,
      options: [
        "To fetch data",
        "To define styles",
        "To manage component lifecycle",
        "To update state directly"
      ],
      correct: 2,
    },
    {
      id: "q2",
      type: "mcq",
      text: "Which hook is used to manage state in a functional component?",
      difficulty: "Easy",
      time: 60,
      options: ["useRef", "useContext", "useEffect", "useState"],
      correct: 3,
    },
    {
      id: "q3",
      type: "mcq",
      text: "Which method lets you optimize expensive calculations?",
      difficulty: "Medium",
      time: 60,
      options: ["useCallback", "useMemo", "useReducer", "useLayoutEffect"],
      correct: 1,
    },
  ];

  const handleStart = () => {
    setCurrentStep("question");
  };

  const handleAnswer = (answer) => {
    setAnswers(prev => [...prev, answer]);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentStep("end");
    }
  };

  if (!quizData) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center p-20">
      <div className="card w-full max-w-xl bg-base-100 shadow-md">
        {currentStep === "info" && (
          <QuizInfo {...quizData} onStart={handleStart} numQuestions={questions.length} />
        )}
        {currentStep === "question" && (
          <QuizQuestion
            question={questions[currentQuestionIndex]}
            index={currentQuestionIndex}
            total={questions.length}
            onAnswer={handleAnswer}
          />
        )}
        {currentStep === "end" && <QuizEnd answers={answers} />}
      </div>
    </div>
  );
}

// Quiz Info Card
function QuizInfo({
  title,
  image,
  description,
  timeLimit,
  status,
  scheduledTime,
  userStatus = "not_attempted",
  difficulty,
  tags = [],
  onStart,
  numQuestions,
}) {
  const [remainingTime, setRemainingTime] = useState(
    Math.max((new Date(scheduledTime) - new Date()) / 1000, 0)
  );

  useEffect(() => {
    if (status !== "scheduled") return;
    const interval = setInterval(() => {
      setRemainingTime(t => Math.max(t - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);

  const countdownValues = [
    Math.floor(remainingTime / (60 * 60 * 24)),
    Math.floor((remainingTime / (60 * 60)) % 24),
    Math.floor((remainingTime / 60) % 60),
    Math.floor(remainingTime % 60),
  ];

  return (
    <>
      <figure>
        <img src={image} alt={title} className="rounded-t-xl object-cover w-full h-48" />
      </figure>
      <div className="card-body">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="mb-4 text-sm text-gray-600">{description}</p>

        <div className="flex flex-wrap gap-2 mb-2">
          <span className="badge badge-outline">{numQuestions} Questions</span>
          <span className="badge badge-outline">{Math.round(timeLimit / 60)} min</span>
          <span className="badge badge-outline">{difficulty}</span>
          <span className="badge badge-info">General</span>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, i) => (
              <span key={i} className="badge badge-ghost">{tag}</span>
            ))}
          </div>
        )}

        <div className="flex gap-2 mb-4">
          <span className={`badge ${
            status === "scheduled"
              ? "badge-accent"
              : status === "done"
              ? "badge-secondary"
              : "badge-primary"
          }`}>
            {status}
          </span>
          <span className={`badge ${
            userStatus === "attempted"
              ? "badge-success"
              : userStatus === "attempting"
              ? "badge-warning"
              : "badge-neutral"
          }`}>
            {userStatus.replace("_", " ")}
          </span>
        </div>

        {status === "scheduled" ? (
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max mb-4">
            {["days", "hours", "min", "sec"].map((unit, i) => (
              <div key={unit} className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-2xl" style={{"--value": countdownValues[i]}}></span>
                {unit}
              </div>
            ))}
          </div>
        ) : (
          <button className="btn btn-primary mt-2" onClick={onStart}>
            {userStatus === "attempted" || status === "done"
              ? "Review Quiz"
              : "Start Quiz"}
          </button>
        )}
      </div>
    </>
  );
}

// Quiz Question Component
function QuizQuestion({ question, index, total, onAnswer }) {
  const [selected, setSelected] = useState(null);

  const handleSubmit = () => {
    if (selected !== null) {
      onAnswer({ questionId: question.id, answer: selected });
      setSelected(null);
    }
  };

  return (
    <div className="card-body">
      <h2 className="text-lg font-semibold mb-2">
        Question {index + 1} of {total}
      </h2>
      <p className="mb-4">{question.text}</p>
      <div className="space-y-2">
        {question.options.map((opt, i) => (
          <label key={i} className="flex items-center gap-2">
            <input
              type="radio"
              name={`q-${question.id}`}
              checked={selected === i}
              onChange={() => setSelected(i)}
              className="radio"
            />
            {opt}
          </label>
        ))}
      </div>
      <button className="btn btn-accent mt-4" onClick={handleSubmit}>
        Submit Answer
      </button>
    </div>
  );
}

// Quiz End Component
function QuizEnd({ answers }) {
  return (
    <div className="card-body text-center">
      <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
      <p>You answered {answers.length} questions.</p>
      <p className="text-sm text-gray-600">Thanks for attempting the quiz.</p>
    </div>
  );
}
