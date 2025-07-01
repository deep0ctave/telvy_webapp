import React, { useState } from "react";

const quizzesData = [
  {
    id: 1,
    title: "React Basics",
    description: "Learn fundamental React concepts.",
    questionsCount: 15,
    time: "20 min",
    type: "live",
    date: "2025-05-20",
    attempted: true,
  },
  {
    id: 2,
    title: "JS Interview Prep",
    description: "Prepare for common JavaScript interview questions.",
    questionsCount: 25,
    time: "30 min",
    type: "done",
    date: "2025-05-10",
    attempted: false,
  },
  {
    id: 3,
    title: "CSS Mastery",
    description: "Master advanced CSS techniques.",
    questionsCount: 20,
    time: "25 min",
    type: "scheduled",
    date: "2025-06-01",
    attempted: false, // logically scheduled cannot be attempted yet
  },
  {
    id: 4,
    title: "Algorithms 101",
    description: "Basic algorithmic problem solving.",
    questionsCount: 18,
    time: "22 min",
    type: "live",
    date: "2025-05-19",
    attempted: false,
  },
  {
    id: 5,
    title: "Node.js Deep Dive",
    description: "In-depth Node.js concepts and usage.",
    questionsCount: 30,
    time: "40 min",
    type: "done",
    date: "2025-04-25",
    attempted: true,
  },
];

const QuizCard = ({ quiz }) => {
  const typeBadgeColor = {
    live: "badge-success",
    scheduled: "badge-info",
    done: "badge-ghost",
  }[quiz.type] || "badge";

  // Determine attempt status badge color and label
  let attemptStatus = "";
  let attemptBadgeColor = "badge-outline";

  if (quiz.type === "live") {
    attemptStatus = "Attempting";
    attemptBadgeColor = "badge-warning";
  } else if (quiz.attempted) {
    attemptStatus = "Attempted";
    attemptBadgeColor = "badge-primary";
  } else {
    attemptStatus = "Not Attempted";
    attemptBadgeColor = "badge-error";
  }

  return (
    <div className="card bg-base-200 border border-base-300 rounded-box shadow-sm">
      <div className="card-body">
        <div className="flex justify-between items-center mb-2">
          <h3 className="card-title text-lg">{quiz.title}</h3>
          <span className={`badge ${typeBadgeColor} capitalize`}>{quiz.type}</span>
        </div>
        <p className="text-sm opacity-70">{quiz.description}</p>
        <div className="mt-3 flex justify-between text-sm opacity-80">
          <span>{quiz.questions} Questions</span>
          <span>{quiz.time}</span>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <p className="text-xs opacity-60">Date: {quiz.date}</p>
          <span className={`badge ${attemptBadgeColor} uppercase text-xs`}>
            {attemptStatus}
          </span>
        </div>
      </div>
    </div>
  );
};


const QuizzesPage = () => {
  const [typeFilter, setTypeFilter] = useState("all");
  const [attemptFilter, setAttemptFilter] = useState("all");

  // Based on the selected type filter, decide if attempt filter options should be disabled
  const attemptFilterDisabled = typeFilter === "scheduled";

  const filteredQuizzes = quizzesData.filter((q) => {
    const typeMatch = typeFilter === "all" || q.type === typeFilter;

    let attemptMatch = true;
    if (!attemptFilterDisabled && attemptFilter !== "all") {
      if (attemptFilter === "attempted") {
        attemptMatch = q.attempted === true;
      } else if (attemptFilter === "notAttempted") {
        attemptMatch = q.attempted === false;
      }
    }

    return typeMatch && attemptMatch;
  });

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-content px-10 py-12">
        <h1 className="text-5xl font-extrabold">Quizzes</h1>
        <p className="mt-4 max-w-2xl text-base opacity-90">
          Browse all your past, upcoming, and live quizzes in one place.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 px-10 pt-8 items-center">
        {/* Type Filter */}
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Type:</span>
          {[
            { label: "All", value: "all" },
            { label: "Live", value: "live" },
            { label: "Scheduled", value: "scheduled" },
            { label: "Done", value: "done" },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setTypeFilter(value)}
              className={`btn btn-sm rounded-full ${
                typeFilter === value ? "btn-primary" : "btn-outline"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Attempt Filter */}
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Attempted:</span>
          {[
            { label: "All", value: "all", disabled: false },
            { label: "Attempted", value: "attempted", disabled: attemptFilterDisabled },
            { label: "Not Attempted", value: "notAttempted", disabled: attemptFilterDisabled },
          ].map(({ label, value, disabled }) => (
            <button
              key={value}
              onClick={() => !disabled && setAttemptFilter(value)}
              className={`btn btn-sm rounded-full ${
                attemptFilter === value ? "btn-primary" : "btn-outline"
              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={disabled}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Clear Filters Button */}
        {(typeFilter !== "all" || attemptFilter !== "all") && (
          <button
            onClick={() => {
              setTypeFilter("all");
              setAttemptFilter("all");
            }}
            className="btn btn-sm rounded-full btn-warning ml-4"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
        {filteredQuizzes.length ? (
          filteredQuizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)
        ) : (
          <p className="col-span-full text-center text-lg opacity-60">
            No quizzes found for this filter combination.
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizzesPage;
