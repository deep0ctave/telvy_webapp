import React from "react";
import { X } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";

// Reorderable item component
const SortableQuestion = ({ question, idx }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="border border-base-200 rounded-lg p-5 bg-base-100 shadow-sm space-y-3 cursor-grab"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          Q{idx + 1}. {question.question_text}
        </h3>
        <span className="badge badge-sm badge-info capitalize">
          {question.question_type}
        </span>
      </div>

      {/* MCQ Options */}
      {question.question_type === "mcq" && (
        <div className="grid gap-2 pl-2">
          {question.options?.length > 0 ? (
            question.options.map((opt, i) => (
              <div
                key={i}
                className={`px-3 py-2 rounded-md border text-sm ${
                  opt.is_correct
                    ? "bg-success/10 border-success text-success font-medium"
                    : "bg-base-200 border-base-300"
                }`}
              >
                {opt.text}
              </div>
            ))
          ) : (
            <div className="italic text-base-content/50">No options provided.</div>
          )}
        </div>
      )}

      {/* True/False */}
      {question.question_type === "true_false" && (
        <div className="flex gap-4 text-sm">
          {["True", "False"].map((val) => (
            <span
              key={val}
              className={`badge p-3 ${
                question.correct_answer?.toLowerCase() === val.toLowerCase()
                  ? "badge-success"
                  : "badge-outline"
              }`}
            >
              {val}
            </span>
          ))}
        </div>
      )}

      {/* Type In */}
      {question.question_type === "type_in" && (
        <p className="text-sm">
          <span className="text-base-content/60">Answer: </span>
          <span className="badge badge-info badge-outline">
            {question.correct_answer || "N/A"}
          </span>
        </p>
      )}
    </div>
  );
};

const ViewQuizModal = ({ quiz, onClose }) => {
  const [questions, setQuestions] = React.useState(quiz.questions || []);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = questions.findIndex((q) => q.id === active.id);
    const newIndex = questions.findIndex((q) => q.id === over.id);

    setQuestions((items) => arrayMove(items, oldIndex, newIndex));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative bg-white dark:bg-base-100 shadow-xl rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 space-y-6 animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-4 top-4 bg-base-200 hover:bg-base-300"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-primary">{quiz.title}</h2>
          {quiz.description && (
            <p className="mt-1 text-base-content/70">{quiz.description}</p>
          )}
          {quiz.tags?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {quiz.tags.map((tag) => (
                <span key={tag} className="badge badge-outline badge-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Questions List */}
        <div className="space-y-5">
          <h3 className="text-lg font-semibold mb-1">Questions</h3>
          {questions.length === 0 ? (
            <div className="text-center text-base-content/60 italic">
              No questions in this quiz.
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToFirstScrollableAncestor]}
            >
              <SortableContext
                items={questions.map((q) => q.id)}
                strategy={verticalListSortingStrategy}
              >
                {questions.map((q, idx) => (
                  <SortableQuestion key={q.id} question={q} idx={idx} />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewQuizModal;
