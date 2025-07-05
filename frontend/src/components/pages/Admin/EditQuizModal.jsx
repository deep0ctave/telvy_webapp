import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { toast } from "react-toastify";
import api from "../../../services/api"; // ✅ use your configured Axios instance

export default function EditQuizModal({ quiz, onClose, onSave }) {
  const [data, setData] = useState({
    ...quiz,
    tags: Array.isArray(quiz.tags) ? quiz.tags.join(", ") : "",
    questions: Array.isArray(quiz.questions)
      ? quiz.questions.map((q) => ({
          ...q,
          collapsed: false,
          options:
            q.options?.length > 0
              ? [...q.options]
              : q.question_type === "true_false"
              ? ["True", "False"]
              : ["", ""]
        }))
      : []
  });

  const updateQuestion = (idx, field, value) => {
    setData((d) => {
      const qs = [...d.questions];
      qs[idx] = { ...qs[idx], [field]: value };
      return { ...d, questions: qs };
    });
  };

  const deleteQuestion = (idx) => {
    setData((d) => {
      const qs = [...d.questions];
      qs.splice(idx, 1);
      return { ...d, questions: qs };
    });
  };

  const addQuestion = () => {
    setData((d) => ({
      ...d,
      questions: [
        ...d.questions,
        {
          id: `${Date.now()}`,
          question_text: "",
          question_type: "mcq",
          options: ["", ""],
          correct_answer: "",
          collapsed: false
        }
      ]
    }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setData((d) => ({
        ...d,
        questions: arrayMove(
          d.questions,
          d.questions.findIndex((x) => x.id === active.id),
          d.questions.findIndex((x) => x.id === over.id)
        )
      }));
    }
  };

  const handleSave = async () => {
    const payload = {
      title: data.title.trim(),
      description: data.description?.trim() || "",
      tags: data.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status: data.status,
      questions: data.questions.map((q) => ({
        question_text: q.question_text.trim(),
        question_type: q.question_type,
        options:
          q.question_type === "mcq"
            ? q.options
            : q.question_type === "true_false"
            ? ["True", "False"]
            : [],
        correct_answer: q.correct_answer
      }))
    };

    try {
      const res = await api.put(`/api/quizzes/${quiz.id}`, payload);
      toast.success("Quiz updated!");
      onSave(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quiz.");
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-bold">Edit Quiz</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            <X />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <textarea
            className="textarea textarea-bordered w-full"
            rows={2}
            placeholder="Description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Tags (comma-separated)"
            value={data.tags}
            onChange={(e) => setData({ ...data, tags: e.target.value })}
          />
          <select
            className="select select-bordered w-full"
            value={data.status}
            onChange={(e) => setData({ ...data, status: e.target.value })}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Questions ({data.questions.length})</h4>
            <button onClick={addQuestion} className="btn btn-sm btn-outline">
              <Plus />
            </button>
          </div>

          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={data.questions.map((q) => q.id)}
              strategy={verticalListSortingStrategy}
            >
              {data.questions.map((q, idx) => (
                <SortableItem
                  key={q.id}
                  id={q.id}
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
          <button className="btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
