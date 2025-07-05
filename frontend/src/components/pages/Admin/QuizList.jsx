// src/components/pages/QuizList.jsx
import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import api from "../../../services/api";
import ViewQuizModal from "./ViewQuizModal";
import EditQuizModal from "./EditQuizModal";
import CreateQuizModal from "./CreateQuizModal";
import DeleteQuizModal from "./DeleteQuizModal";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const fetchQuizzes = async () => {
    try {
      const res = await api.get("/full-quizzes"); // new full quiz API
      setQuizzes(res.data);
    } catch (err) {
      console.error("Failed to fetch quizzes", err);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quizzes</h1>
        <button className="btn btn-primary" onClick={() => setCreateModal(true)}>
          <Plus className="mr-2" /> Create Quiz
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Tags</th>
              <th>Type</th>
              <th>Time Limit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td>{quiz.title}</td>
                <td>{quiz.tags?.join(", ")}</td>
                <td>{quiz.quiz_type}</td>
                <td>{quiz.time_limit} sec</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => {
                      setSelectedQuiz(quiz);
                      setViewModal(true);
                    }}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={async () => {
                      try {
                        const res = await api.get(`/full-quizzes/${quiz.id}`);
                        setSelectedQuiz(res.data);
                        setEditModal(true);
                      } catch (err) {
                        console.error("Failed to fetch full quiz");
                      }
                    }}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="btn btn-sm btn-ghost text-error"
                    onClick={() => {
                      setSelectedQuiz(quiz);
                      setDeleteModal(true);
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {createModal && (
        <CreateQuizModal
          onClose={() => setCreateModal(false)}
          onCreate={() => {
            fetchQuizzes();
            setCreateModal(false);
          }}
        />
      )}

      {viewModal && selectedQuiz && (
        <ViewQuizModal quiz={selectedQuiz} onClose={() => setViewModal(false)} />
      )}

      {editModal && selectedQuiz && (
        <EditQuizModal
          quiz={selectedQuiz}
          onClose={() => setEditModal(false)}
          onUpdate={() => {
            fetchQuizzes();
            setEditModal(false);
          }}
        />
      )}

      {deleteModal && selectedQuiz && (
        <DeleteQuizModal
          quizId={selectedQuiz.id}
          onClose={() => setDeleteModal(false)}
          onDelete={() => {
            fetchQuizzes();
            setDeleteModal(false);
          }}
        />
      )}
    </div>
  );
}
