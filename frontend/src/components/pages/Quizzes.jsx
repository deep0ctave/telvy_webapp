import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CalendarClock, PlayCircle, Eye, Edit, Trash } from "lucide-react";

const mockQuizzes = [
  {
    id: "1",
    title: "Algebra Basics",
    description: "Test your fundamental algebra knowledge",
    time_limit: 20,
    tags: ["math", "algebra"],
    quiz_type: "mcq",
    image_url: "",
    starts_at: new Date(Date.now() + 5 * 60 * 1000),
    ends_at: new Date(Date.now() + 65 * 60 * 1000),
    attempted: false,
  },
  {
    id: "2",
    title: "History of India",
    description: "Ancient to modern Indian history",
    time_limit: 15,
    quiz_type: "mcq",
    tags: ["history"],
    image_url: "",
    starts_at: new Date(Date.now() - 60 * 60 * 1000),
    ends_at: new Date(Date.now() + 60 * 60 * 1000),
    attempted: true,
    attemptId: "attempt123",
  },
  {
    id: "3",
    title: "Science Rapid Fire",
    description: "Quick true/false round on basic science",
    time_limit: 10,
    quiz_type: "true_false",
    image_url: "",
    starts_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
    ends_at: new Date(Date.now() + 25 * 60 * 60 * 1000),
    attempted: false,
  },
];

const Quizzes = () => {
  const { user } = useAuth();
  const actualUser = user?.user || user;
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setTimeout(() => {
      setQuizzes(mockQuizzes);
    }, 300);
  }, []);

  const now = new Date();

  const getStatus = (quiz) => {
    if (quiz.attempted) return "attempted";
    if (quiz.starts_at > now) return "scheduled";
    if (quiz.starts_at <= now && quiz.ends_at > now) return "live";
    return "ended";
  };

  const filteredQuizzes = quizzes.filter((quiz) => {
    const status = getStatus(quiz);
    return filter === "all" || status === filter;
  });

  const handleStart = (quizId) => navigate(`/attempts/start/${quizId}`);
  const handleResume = (attemptId) => navigate(`/attempts/result/${attemptId}`);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Quizzes</h1>
        <div className="tabs tabs-boxed">
          {["all", "attempted", "live", "scheduled"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`tab ${filter === type ? "tab-active" : ""}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredQuizzes.length === 0 ? (
        <div className="w-full py-16 text-center text-base-content/60">
          <h2 className="text-2xl font-semibold mb-2">No quizzes found</h2>
          <p className="text-sm">
            Looks like there are no{" "}
            <span className="font-semibold">{filter}</span> quizzes available right now.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuizzes.map((quiz) => {
            const status = getStatus(quiz);
            return (
              <div key={quiz.id} className="card bg-base-200 shadow-md border border-base-300">
                <div className="card-body space-y-2">
                  <div className="flex justify-between items-center">
                    <h2 className="card-title">{quiz.title}</h2>
                    {status === "scheduled" && (
                      <span className="badge badge-info">Scheduled</span>
                    )}
                    {status === "live" && (
                      <span className="badge badge-success">Live</span>
                    )}
                    {status === "attempted" && (
                      <span className="badge badge-accent">Attempted</span>
                    )}
                  </div>

                  <p>{quiz.description}</p>

                  <div className="text-sm opacity-70 flex gap-2 items-center">
                    <CalendarClock className="w-4 h-4" />
                    <span>
                      {quiz.time_limit} mins • {quiz.quiz_type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {quiz.tags?.map((tag, idx) => (
                      <div key={idx} className="badge badge-outline badge-sm">
                        {tag}
                      </div>
                    ))}
                  </div>

                  <div className="card-actions justify-end mt-4">
                    {actualUser.user_type === "student" && (
                      <>
                        {status === "scheduled" && (
                          <button className="btn btn-sm btn-outline" disabled>
                            Starts in {Math.floor((quiz.starts_at - now) / 60000)} min
                          </button>
                        )}
                        {status === "live" && (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleStart(quiz.id)}
                          >
                            <PlayCircle className="w-4 h-4 mr-1" /> Start
                          </button>
                        )}
                        {status === "attempted" && (
                          <button
                            className="btn btn-sm btn-outline"
                            onClick={() => handleResume(quiz.attemptId)}
                          >
                            <Eye className="w-4 h-4 mr-1" /> View Result
                          </button>
                        )}
                      </>
                    )}

                    {(actualUser.user_type === "teacher" ||
                      actualUser.user_type === "admin") && (
                      <>
                        <button className="btn btn-sm btn-neutral">
                          <Eye className="w-4 h-4 mr-1" /> View
                        </button>
                        <button className="btn btn-sm btn-info">
                          <Edit className="w-4 h-4 mr-1" /> Edit
                        </button>
                        <button className="btn btn-sm btn-error">
                          <Trash className="w-4 h-4 mr-1" /> Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Quizzes;
