// DeleteQuizModal.jsx
import React from "react";
import { X, Trash2 } from "lucide-react";

export default function DeleteQuizModal({ quiz, onClose, onDelete }) {
  return (
    <div className="modal modal-open">
      <div className="modal-box w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-error">Delete Quiz</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            <X />
          </button>
        </div>

        <p className="mb-4">
          Are you sure you want to permanently delete the quiz{" "}
          <span className="font-semibold">{quiz.title}</span>? This action cannot be undone.
        </p>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn btn-error" onClick={() => onDelete(quiz.id)}>
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
