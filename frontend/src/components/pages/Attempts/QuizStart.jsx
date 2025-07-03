import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, AlarmClock, ClipboardList, BookOpen } from "lucide-react";

const QuizStart = () => {
  const { id } = useParams(); // quizId
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    // Simulate quiz fetch
    setTimeout(() => {
      setQuiz({
        id,
        title: "Science Basics Quiz",
        description: "Test your knowledge of basic science concepts.",
        time_limit: 15,
        total_questions: 10,
        quiz_type: "mcq",
        image_url: "https://source.unsplash.com/600x300/?science",
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleStart = async () => {
    setStarting(true);

    try {
      // Simulate API call to /attempts/start
      const fakeAttemptId = "12345";
      setTimeout(() => {
        navigate(`/attempts/live/${fakeAttemptId}`);
      }, 500);
    } catch (err) {
      console.error("Failed to start attempt", err);
    } finally {
      setStarting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  if (!quiz) {
    return <div className="text-center text-error">Quiz not found.</div>;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <div className="card bg-base-100 shadow-xl">
        {quiz.image_url && (
          <figure>
            <img
              src={quiz.image_url}
              alt={quiz.title}
              className="w-full max-h-[300px] object-cover"
            />
          </figure>
        )}
        <div className="card-body space-y-2">
          <h1 className="card-title text-3xl">{quiz.title}</h1>
          <p className="text-gray-500">{quiz.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <AlarmClock className="w-4 h-4 text-primary" />
              Time Limit: {quiz.time_limit} mins
            </div>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-info" />
              Questions: {quiz.total_questions}
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-success" />
              Type: {quiz.quiz_type.toUpperCase()}
            </div>
          </div>

          <div className="card-actions justify-end mt-6">
            <button
              onClick={handleStart}
              disabled={starting}
              className={`btn btn-primary ${starting ? "btn-disabled" : ""}`}
            >
              {starting ? "Starting..." : "Start Quiz"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizStart;
