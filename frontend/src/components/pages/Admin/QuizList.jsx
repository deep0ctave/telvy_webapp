import React, { useState, useEffect } from "react";
import { Pencil, Trash2, ChevronUp, ChevronDown, Filter } from "lucide-react";
import CreateQuizModal from "./CreateQuizModal";
import EditQuizModal from "./EditQuizModal";

const mockQuizzes = [
  {
    id: 1,
    title: "Algebra Basics",
    tags: ["math", "algebra"],
    total_questions: 10,
    created_by: "teacher01",
    status: "published",
  },
  {
    id: 2,
    title: "History of India",
    tags: ["history", "india"],
    total_questions: 15,
    created_by: "teacher02",
    status: "draft",
  },
  {
    id: 3,
    title: "Photosynthesis Quiz",
    tags: ["biology", "plants"],
    total_questions: 8,
    created_by: "teacher03",
    status: "archived",
  },
];

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [filters, setFilters] = useState({
    title: "",
    tags: "",
    created_by: "",
    status: "",
  });
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  useEffect(() => {
    setTimeout(() => {
      setQuizzes(mockQuizzes);
      setFiltered(mockQuizzes);
    }, 300);
  }, []);

  useEffect(() => {
    let data = [...quizzes];

    if (search) {
      const lower = search.toLowerCase();
      data = data.filter(
        (q) =>
          q.title.toLowerCase().includes(lower) ||
          q.created_by.toLowerCase().includes(lower)
      );
    }

    if (advancedSearch) {
      Object.entries(filters).forEach(([key, val]) => {
        if (val.trim() !== "") {
          data = data.filter((q) =>
            q[key]?.toString().toLowerCase().includes(val.toLowerCase())
          );
        }
      });
    }

    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key]?.toString().toLowerCase() || "";
        const bVal = b[sortConfig.key]?.toString().toLowerCase() || "";

        return sortConfig.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }

    setFiltered(data);
  }, [search, filters, advancedSearch, sortConfig, quizzes]);

  const toggleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Delete this quiz?");
    if (confirm) setQuizzes((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap justify-between gap-4 items-center">
        <h1 className="text-2xl font-bold">Manage Quizzes</h1>
        <div className="flex gap-2">
          <button className="btn btn-outline" onClick={() => setAdvancedSearch((s) => !s)}>
            <Filter className="w-4 h-4" /> Advanced Search
          </button>
          <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
            + Create Quiz
          </button>
        </div>
      </div>

      <input
        type="text"
        className="input input-bordered w-full max-w-md"
        placeholder="Search by title or creator..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {advancedSearch && (
        <div className="grid md:grid-cols-2 gap-4 bg-base-200 p-4 rounded-md">
          {["title", "tags", "created_by", "status"].map((field) => (
            <input
              key={field}
              type="text"
              className="input input-bordered w-full"
              placeholder={`Filter by ${field}`}
              value={filters[field]}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, [field]: e.target.value }))
              }
            />
          ))}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              {["title", "tags", "total_questions", "created_by", "status"].map((col) => (
                <th key={col} className="cursor-pointer" onClick={() => toggleSort(col)}>
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
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="99" className="text-center py-6 text-base-content/60">
                  No quizzes found.
                </td>
              </tr>
            ) : (
              filtered.map((quiz) => (
                <tr key={quiz.id}>
                  <td>{quiz.title}</td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {quiz.tags.map((tag) => (
                        <div key={tag} className="badge badge-accent badge-sm">
                          {tag}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>{quiz.total_questions}</td>
                  <td>{quiz.created_by}</td>
                  <td>
                    <span className={`badge badge-${statusColor(quiz.status)}`}>
                      {quiz.status}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => {
                        setSelectedQuiz(quiz);
                        setShowEditModal(true);
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(quiz.id)}
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

      {showCreateModal && (
        <CreateQuizModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(newQuiz) => {
            setQuizzes((prev) => [...prev, { id: Date.now(), ...newQuiz }]);
            setShowCreateModal(false);
          }}
        />
      )}

      {showEditModal && selectedQuiz && (
        <EditQuizModal
          quiz={selectedQuiz}
          onClose={() => {
            setSelectedQuiz(null);
            setShowEditModal(false);
          }}
          onSave={(updated) => {
            setQuizzes((prev) =>
              prev.map((q) => (q.id === updated.id ? { ...q, ...updated } : q))
            );
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
};

const statusColor = (status) => {
  switch (status) {
    case "published":
      return "success";
    case "draft":
      return "warning";
    case "archived":
      return "neutral";
    default:
      return "info";
  }
};

export default QuizList;
