import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CalendarDays, Clock10, Tags, CircleUser } from 'lucide-react';

const QuizStart = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setQuiz({
        id: quizId,
        title: "General Science Quiz",
        description: "Test your basics in physics, chemistry, and biology.",
        time_limit: 15,
        quiz_type: "mcq",
        tags: ["science", "biology", "physics"],
        image_url:
          "https://images.unsplash.com/photo-1581090700227-1e8f2b0f3428?auto=format&fit=crop&w=900&q=60",
        starts_at: new Date(Date.now()),
        ends_at: new Date(Date.now() + 30 * 60000),
      });
    }, 300);
  }, [quizId]);

  const handleStart = () => navigate(`/attempts/live/${quizId}`);

  if (!quiz) return <div className="p-6">Loading quiz...</div>;

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-4">
      <div className="card bg-base-100 border border-base-300 shadow-md overflow-hidden">
        {quiz.image_url && (
          <img
            src={quiz.image_url}
            alt={quiz.title}
            className="w-full h-52 object-cover"
          />
        )}
        <div className="card-body p-4 space-y-3">
          <h2 className="text-xl font-bold">{quiz.title}</h2>
          <p className="text-sm text-base-content/70">{quiz.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mt-2">
            <div className="flex items-center gap-2">
              <Clock10 className="w-4 h-4 text-primary" />
              <span>{quiz.time_limit} mins</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-primary" />
              <span>
                {new Date(quiz.starts_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{" "}
                {new Date(quiz.ends_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CircleUser className="w-4 h-4 text-primary" />
              <span className="capitalize">{quiz.quiz_type}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Tags className="w-4 h-4 text-primary" />
              <div className="flex gap-1 flex-wrap">
                {quiz.tags.map((tag, i) => (
                  <div key={i} className="badge badge-outline badge-sm">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="alert alert-info text-xs sm:text-sm mt-4">
            Once you start the quiz, the timer will begin. Do not refresh or leave.
          </div>

          <div className="flex justify-end">
            <button className="btn btn-primary btn-md sm:btn-md mt-2" onClick={handleStart}>
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizStart;
