import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Trophy, Loader2 } from "lucide-react";

const AttemptResult = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate result fetch
    setTimeout(() => {
      setResult({
        score: 8,
        total: 10,
        percentage: 80,
        correct: 8,
        incorrect: 2,
        attempted: 10,
        quizTitle: "Science Basics Quiz",
      });
      setLoading(false);
    }, 1000);
  }, [attemptId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  if (!result) {
    return <div className="text-center text-error">Result not found.</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-content rounded-box p-6 shadow text-center">
        <Trophy className="w-10 h-10 mx-auto mb-2" />
        <h1 className="text-2xl font-bold mb-1">{result.quizTitle}</h1>
        <p className="text-lg">You scored {result.score} out of {result.total} ({result.percentage}%)</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-base-200 p-4 rounded-box text-center">
          <p className="font-bold text-success">Correct</p>
          <p>{result.correct}</p>
        </div>
        <div className="bg-base-200 p-4 rounded-box text-center">
          <p className="font-bold text-error">Incorrect</p>
          <p>{result.incorrect}</p>
        </div>
        <div className="bg-base-200 p-4 rounded-box text-center col-span-2">
          <p className="font-bold">Total Attempted</p>
          <p>{result.attempted}</p>
        </div>
      </div>

      <div className="text-center">
        <button
          className="btn btn-outline btn-primary mt-4"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AttemptResult;
