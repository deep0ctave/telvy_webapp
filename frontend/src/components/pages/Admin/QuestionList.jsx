import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Filter } from "lucide-react";
import CreateQuestionModal from "./CreateQuestionModal";
import EditQuestionModal from "./EditQuestionModal";
import DeleteQuestionModal from "./DeleteQuestionModal";
import CreateQuizFromQuestionsModal from "./CreateQuizFromQuestionsModal";

const mockQuestions = [
  {
    id: 1,
    question_text: "What is the capital of India?",
    question_type: "mcq",
    options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
    correct_answer: "Delhi",
    tags: ["geography", "india"]
  },
  {
    id: 2,
    question_text: "True or False: Water boils at 100°C.",
    question_type: "true_false",
    options: ["True", "False"],
    correct_answer: "True",
    tags: ["science"]
  },
  {
    id: 3,
    question_text: "Who wrote the Ramayana?",
    question_type: "type_in",
    correct_answer: "Valmiki",
    tags: ["literature", "history"]
  }
];

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showAddToQuizModal, setShowAddToQuizModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setQuestions(mockQuestions);
      setFiltered(mockQuestions);
    }, 200);
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(
      questions.filter((q) =>
        q.question_text.toLowerCase().includes(lower)
      )
    );
  }, [search, questions]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDelete = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    setDeleteTarget(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Manage Questions</h1>
        <div className="flex gap-2">
          <button className="btn btn-outline" onClick={() => setShowAddToQuizModal(true)}>
            ➕ Add to Quiz
          </button>
          <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
            + Create Question
          </button>
        </div>
      </div>

      <input
        type="text"
        className="input input-bordered w-full max-w-md"
        placeholder="Search questions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Question</th>
              <th>Type</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="99" className="text-center py-4 text-base-content/60">
                  No matching questions found.
                </td>
              </tr>
            ) : (
              filtered.map((q) => (
                <tr key={q.id}>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selected.includes(q.id)}
                      onChange={() => toggleSelect(q.id)}
                    />
                  </td>
                  <td>{q.question_text}</td>
                  <td>
                    <span className="badge badge-outline badge-sm capitalize">
                      {q.question_type}
                    </span>
                  </td>
                  <td className="space-x-1">
                    {q.tags?.map((t) => (
                      <span key={t} className="badge badge-ghost badge-xs">{t}</span>
                    ))}
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => setEditTarget(q)}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => setDeleteTarget(q)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showCreate && (
        <CreateQuestionModal
          onClose={() => setShowCreate(false)}
          onCreate={(newQ) => {
            setQuestions((prev) => [...prev, { id: Date.now(), ...newQ }]);
            setShowCreate(false);
          }}
        />
      )}

      {editTarget && (
        <EditQuestionModal
          question={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={(updated) => {
            setQuestions((prev) =>
              prev.map((q) => (q.id === updated.id ? updated : q))
            );
            setEditTarget(null);
          }}
        />
      )}

      {deleteTarget && (
        <DeleteQuestionModal
          isOpen
          question={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      {showAddToQuizModal && (
        <CreateQuizFromQuestionsModal
          selectedQuestions={questions.filter((q) => selected.includes(q.id))}
          onClose={() => setShowAddToQuizModal(false)}
        />
      )}
    </div>
  );
};

export default QuestionList;
