// CreateQuizModal.jsx
import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";

export default function CreateQuizModal({ onClose, onCreate }) {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    tags: "",
    status: "draft",
    questions: []
  });

  const addQuestion = () => {
    setQuiz(q => ({
      ...q,
      questions: [
        ...q.questions,
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

  const updateQuestion = (idx, field, value) => {
    setQuiz(q => {
      const qs = [...q.questions];
      qs[idx] = { ...qs[idx], [field]: value };
      return { ...q, questions: qs };
    });
  };

  const deleteQuestion = idx => {
    setQuiz(q => {
      const qs = [...q.questions];
      qs.splice(idx, 1);
      return { ...q, questions: qs };
    });
  };

  const handleDragEnd = event => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setQuiz(q => ({
        ...q,
        questions: arrayMove(
          q.questions,
          q.questions.findIndex(x => x.id === active.id),
          q.questions.findIndex(x => x.id === over.id)
        )
      }));
    }
  };

  const handleSubmit = () => {
    onCreate({
      title: quiz.title,
      description: quiz.description,
      tags: quiz.tags.split(",").map(t => t.trim()),
      status: quiz.status,
      questions: quiz.questions.map(({ question_text, question_type, options, correct_answer }) => ({
        question_text,
        question_type,
        options:
          question_type === "mcq"
            ? options
            : question_type === "true_false"
            ? ["True", "False"]
            : [],
        correct_answer
      }))
    });
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-bold">Create Quiz</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm"><X /></button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Title"
            value={quiz.title}
            onChange={e => setQuiz({ ...quiz, title: e.target.value })}
          />
          <textarea
            className="textarea textarea-bordered w-full"
            rows={2}
            placeholder="Description"
            value={quiz.description}
            onChange={e => setQuiz({ ...quiz, description: e.target.value })}
          />
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Tags (comma-separated)"
            value={quiz.tags}
            onChange={e => setQuiz({ ...quiz, tags: e.target.value })}
          />
          <select
            className="select select-bordered w-full"
            value={quiz.status}
            onChange={e => setQuiz({ ...quiz, status: e.target.value })}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Questions ({quiz.questions.length})</h4>
            <button onClick={addQuestion} className="btn btn-sm btn-outline"><Plus /></button>
          </div>

          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={quiz.questions.map(q => q.id)} strategy={verticalListSortingStrategy}>
              {quiz.questions.map((q, idx) => (
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
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Create Quiz</button>
        </div>
      </div>
    </div>
  );
}
