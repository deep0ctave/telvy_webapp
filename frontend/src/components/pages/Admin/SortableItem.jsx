// SortableItem.jsx
import React from "react";
import { ChevronDown, ChevronUp, Trash2, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ id, question, onToggle, onDelete, onChange }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="card bg-base-200 border mb-2">
      <div className="card-body p-4 space-y-2">
        <div className="flex justify-between items-center">
          <div {...attributes} {...listeners} className="cursor-grab"><GripVertical /></div>
          <div className="flex gap-2">
            <button onClick={onToggle}>{question.collapsed ? <ChevronDown /> : <ChevronUp />}</button>
            <button onClick={onDelete}><Trash2 /></button>
          </div>
        </div>

        {!question.collapsed && (
          <>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Question text"
              value={question.question_text}
              onChange={e => onChange("question_text", e.target.value)}
            />

            <select
              className="select select-bordered w-full"
              value={question.question_type}
              onChange={e => onChange("question_type", e.target.value)}
            >
              <option value="mcq">MCQ</option>
              <option value="true_false">True/False</option>
              <option value="type_in">Type‑In</option>
            </select>

            {(question.question_type === "mcq" || question.question_type === "true_false") && (
              <div className="space-y-2">
                {question.options.map((opt, oi) => (
                  <div key={oi} className="flex gap-2 items-center">
                    <input
                      className="input input-bordered flex-1"
                      placeholder={`Option ${oi + 1}`}
                      value={opt}
                      onChange={e => {
                        const newOpts = [...question.options];
                        newOpts[oi] = e.target.value;
                        onChange("options", newOpts);
                      }}
                    />
                    <input
                      type="radio"
                      name={`correct-${id}`}
                      checked={question.correct_answer === opt}
                      onChange={() => onChange("correct_answer", opt)}
                    />
                    {question.question_type === "mcq" && oi >= 2 && (
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => {
                          const newOpts = [...question.options];
                          newOpts.splice(oi, 1);
                          onChange("options", newOpts);
                        }}
                      >Delete</button>
                    )}
                  </div>
                ))}
                {question.question_type === "mcq" && (
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => onChange("options", [...question.options, ""])}
                  >
                    + Option
                  </button>
                )}
              </div>
            )}

            {question.question_type === "type_in" && (
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Correct answer"
                value={question.correct_answer}
                onChange={e => onChange("correct_answer", e.target.value)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
