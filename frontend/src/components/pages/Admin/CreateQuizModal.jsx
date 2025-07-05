// components/modals/CreateQuizModal.jsx
import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { toast } from "react-toastify";
import api from "../../../services/api";

export default function CreateQuizModal({ onClose, onCreate }) {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    tags: "",
    status: "draft",
    quiz_type: "anytime",
    time_limit: 600,
    questions: [],
  });

  const addQuestion = () => {
    setQuiz((q) => ({
      ...q,
      questions: [
        ...q.questions,
        {
          id: `${Date.now()}`,
          question_text: "",
          question_type: "mcq",
          options: ["", "", "", ""],
          correct_answer: "",
          collapsed: false,
        },
      ],
    }));
  };

  const updateQuestion = (idx, field, value) => {
    setQuiz((q) => {
      const qs = [...q.questions];
      qs[idx] = { ...qs[idx], [field]: value };
      return { ...q, questions: qs };
    });
  };

  const deleteQuestion = (idx) => {
    setQuiz((q) => {
      const qs = [...q.questions];
      qs.splice(idx, 1);
      return { ...q, questions: qs };
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setQuiz((q) => ({
        ...q,
        questions: arrayMove(
          q.questions,
          q.questions.findIndex((x) => x.id === active.id),
          q.questions.findIndex((x) => x.id === over.id)
        ),
      }));
    }
  };

  const handleSubmit = async () => {
    if (!quiz.title.trim()) return toast.error("Title is required");
    if (!quiz.questions.length) return toast.error("Add at least one question");

    const payload = {
      title: quiz.title.trim(),
      description: quiz.description.trim(),
      tags: quiz.tags
        ? quiz.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      quiz_type: quiz.quiz_type,
      time_limit: quiz.time_limit,
      questions: quiz.questions.map((q) => {
        const base = {
          question_text: q.question_text.trim(),
          question_type: q.question_type,
          question_image: null,
        };
        if (q.question_type === "mcq" || q.question_type === "true_false") {
          base.options = q.options.map((opt, i) => ({
            text: opt,
            is_correct: String(i) === q.correct_answer,
          }));
        } else if (q.question_type === "type_in") {
          base.accepted_answers = [q.correct_answer.trim()].filter(Boolean);
        }
        return base;
      }),
    };

    try {
      const res = await api.post("/full-quizzes", payload);
      toast.success("Quiz created successfully!");
      onCreate?.(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create quiz");
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-bold">Create Quiz</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            <X />
          </button>
        </div>

        <div className="space-y-4">
          <label className="form-control">
            <div className="label"><span className="label-text">Quiz Title</span></div>
            <input
              type="text"
              className="input input-bordered"
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              placeholder="Enter quiz title"
            />
          </label>

          <label className="form-control">
            <div className="label"><span className="label-text">Description</span></div>
            <textarea
              className="textarea textarea-bordered"
              rows={2}
              placeholder="Describe the quiz"
              value={quiz.description}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            />
          </label>

          <label className="form-control">
            <div className="label"><span className="label-text">Tags (comma separated)</span></div>
            <input
              type="text"
              className="input input-bordered"
              placeholder="math, science"
              value={quiz.tags}
              onChange={(e) => setQuiz({ ...quiz, tags: e.target.value })}
            />
          </label>

          <label className="form-control">
            <div className="label"><span className="label-text">Time Limit (in seconds)</span></div>
            <input
              type="number"
              className="input input-bordered"
              value={quiz.time_limit}
              onChange={(e) => setQuiz({ ...quiz, time_limit: parseInt(e.target.value) })}
            />
          </label>

          <label className="form-control">
            <div className="label"><span className="label-text">Quiz Type</span></div>
            <select
              className="select select-bordered"
              value={quiz.quiz_type}
              onChange={(e) => setQuiz({ ...quiz, quiz_type: e.target.value })}
            >
              <option value="anytime">Anytime</option>
              <option value="live">Live</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </label>

          <div className="flex justify-between items-center">
            <h4 className="font-semibold">
              Questions ({quiz.questions.length})
            </h4>
            <button onClick={addQuestion} className="btn btn-sm btn-outline">
              <Plus /> Add Question
            </button>
          </div>

          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={quiz.questions.map((q) => q.id)}
              strategy={verticalListSortingStrategy}
            >
              {quiz.questions.map((q, idx) => (
                <SortableItem
                  key={q.id}
                  id={q.id}
                  index={idx}
                  question={q}
                  onToggle={() => updateQuestion(idx, "collapsed", !q.collapsed)}
                  onDelete={() => deleteQuestion(idx)}
                  onChange={(f, v) => updateQuestion(idx, f, v)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        <div className="modal-action justify-end">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
