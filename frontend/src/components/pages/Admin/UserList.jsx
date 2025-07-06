// File: components/pages/Admin/QuizList.jsx
import React, { useEffect, useState } from "react";
import { Pencil, Trash2, ChevronUp, ChevronDown, Filter } from "lucide-react";
import {
  getAllFullQuizzes,
  deleteFullQuiz,
} from "../../../services/api";
import CreateQuizModal from "./CreateQuizModal";
import EditQuizModal from "./EditQuizModal";
import DeleteQuizModal from "./DeleteQuizModal";
import { toast } from "react-toastify";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    title: "",
    quiz_type: "",
    tags: "",
    time_limit: "",
  });
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [advancedSearch, setAdvancedSearch] = useState(false);

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    filterAndSort();
  }, [search, filters, sortConfig, quizzes]);

  const fetchQuizzes = async () => {
    try {
      const data = await getAllFullQuizzes();
      setQuizzes(data);
    } catch (err) {
      toast.error("Failed to fetch quizzes");
    }
  };

  const filterAndSort = () => {
    let data = [...quizzes];

    if (search.trim()) {
      const lower = search.toLowerCase();
      data = data.filter(
        (q) =>
          q.title?.toLowerCase().includes(lower) ||
          q.description?.toLowerCase().includes(lower)
      );
    }

    if (advancedSearch) {
      Object.entries(filters).forEach(([key, val]) => {
        if (val.trim()) {
          const lowerVal = val.toLowerCase();
          data = data.filter((q) =>
            (q[key] || "").toString().toLowerCase().includes(lowerVal)
          );
        }
      });
    }

    if (sortConfig.key) {
      const { key, direction } = sortConfig;
      data.sort((a, b) => {
        const aVal = a[key]?.toString().toLowerCase() || "";
        const bVal = b[key]?.toString().toLowerCase() || "";
        return direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }

    setFilteredQuizzes(data);
  };

  const toggleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleDelete = async () => {
    try {
      await deleteFullQuiz(selectedQuiz.id);
      setQuizzes((prev) => prev.filter((q) => q.id !== selectedQuiz.id));
      toast.success("Quiz deleted");
      setShowDelete(false);
    } catch (err) {
      toast.error("Failed to delete quiz");
    }
  };

  const badgeColor = (type) =>
    type === "scheduled" ? "badge-secondary" : "badge-accent";

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Manage Quizzes</h1>
        <div className="flex gap-2">
          <button
            className="btn btn-outline"
            onClick={() => setAdvancedSearch((s) => !s)}
          >
            <Filter className="w-4 h-4" /> Advanced Search
          </button>
          <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
            + Create Quiz
          </button>
        </div>
      </div>

      <input
        type="text"
        className="input input-bordered w-full max-w-md"
        placeholder="Search by title or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {advancedSearch && (
        <div className="grid md:grid-cols-3 gap-4 bg-base-200 p-4 rounded-md">
          {Object.keys(filters).map((key) => (
            <input
              key={key}
              type="text"
              className="input input-bordered"
              placeholder={`Filter by ${key}`}
              value={filters[key]}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, [key]: e.target.value }))
              }
            />
          ))}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              {["title", "quiz_type", "tags", "time_limit", "created_at"].map((col) => (
                <th
                  key={col}
                  onClick={() => toggleSort(col)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-1 capitalize">
                    {col.replace("_", " ")}
                    {sortConfig.key === col &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </div>
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuizzes.length === 0 ? (
              <tr>
                <td colSpan="99" className="text-center text-base-content/60 py-4">
                  No matching quizzes found.
                </td>
              </tr>
            ) : (
              filteredQuizzes.map((quiz) => (
                <tr key={quiz.id}>
                  <td>{quiz.title}</td>
                  <td>
                    <span className={`badge ${badgeColor(quiz.quiz_type)}`}>
                      {quiz.quiz_type}
                    </span>
                  </td>
                  <td>{quiz.tags?.join(", ") || "-"}</td>
                  <td>{quiz.time_limit} sec</td>
                  <td>
                    {quiz.created_at
                      ? new Date(quiz.created_at).toLocaleDateString("en-GB")
                      : "-"}
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        setSelectedQuiz(quiz);
                        setShowEdit(true);
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => {
                        setSelectedQuiz(quiz);
                        setShowDelete(true);
                      }}
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
        <CreateQuizModal
          onClose={() => setShowCreate(false)}
          onCreate={(created) => {
            setQuizzes((prev) => [...prev, created]);
            toast.success("Quiz created");
          }}
        />
      )}

      {showEdit && selectedQuiz && (
        <EditQuizModal
          quiz={selectedQuiz}
          onClose={() => {
            setSelectedQuiz(null);
            setShowEdit(false);
          }}
          onSave={(updated) => {
            setQuizzes((prev) =>
              prev.map((q) => (q.id === updated.id ? updated : q))
            );
            toast.success("Quiz updated");
          }}
        />
      )}

      {showDelete && selectedQuiz && (
        <DeleteQuizModal
          quiz={selectedQuiz}
          onClose={() => setShowDelete(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default QuizList;
