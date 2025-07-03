import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

const StartAttempt = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(900); // default 15 mins

  useEffect(() => {
    // Simulate fetch
    setTimeout(() => {
      setQuestions([
        {
          id: 1,
          question_text: "What is the boiling point of water?",
          question_image: "https://source.unsplash.com/400x200/?boiling",
          question_type: "mcq",
          options: ["50°C", "100°C", "150°C", "200°C"],
        },
        {
          id: 2,
          question_text: "The Earth is flat.",
          question_type: "true_false",
        },
        {
          id: 3,
          question_text: "Who invented gravity?",
          question_type: "type_in",
        },
      ]);
      setTimer(15 * 60);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      handleSubmit();
      return;
    }
    const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleChange = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted answers:", answers);
    navigate("/attempts/result/" + attemptId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  const q = questions[current];
  const formattedTime = `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Time Left: {formattedTime}</h2>
        <div className="flex gap-2 flex-wrap">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`btn btn-xs ${idx === current ? "btn-primary" : "btn-outline"}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="card bg-base-100 shadow-md">
        {q.question_image && (
          <figure>
            <img
              src={q.question_image}
              alt="question"
              className="w-full max-h-[250px] object-cover"
            />
          </figure>
        )}
        <div className="card-body space-y-4">
          <h3 className="text-lg font-bold">
            Q{current + 1}. {q.question_text}
          </h3>

          {q.question_type === "mcq" && (
            <div className="form-control space-y-2">
              {q.options.map((opt, idx) => (
                <label key={idx} className="label cursor-pointer">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    className="radio"
                    checked={answers[q.id] === opt}
                    onChange={() => handleChange(q.id, opt)}
                  />
                  <span className="label-text ml-2">{opt}</span>
                </label>
              ))}
            </div>
          )}

          {q.question_type === "true_false" && (
            <div className="flex gap-4">
              {["True", "False"].map((opt) => (
                <label key={opt} className="label cursor-pointer">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    className="radio"
                    checked={answers[q.id] === opt}
                    onChange={() => handleChange(q.id, opt)}
                  />
                  <span className="label-text ml-2">{opt}</span>
                </label>
              ))}
            </div>
          )}

          {q.question_type === "type_in" && (
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Type your answer"
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}

          <div className="flex justify-between mt-4">
            <button
              className="btn btn-outline"
              disabled={current === 0}
              onClick={() => setCurrent((c) => c - 1)}
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>

            {current === questions.length - 1 ? (
              <button className="btn btn-success" onClick={handleSubmit}>
                Submit Quiz
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => setCurrent((c) => c + 1)}
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartAttempt;
