import { format } from "date-fns";
import { Check, Trash2, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function TodoItem({ todo, onToggle, onDelete }) {
  const isCompleted = Boolean(todo.completed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      className={`group flex items-center justify-between p-4 mb-3 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md ${isCompleted ? "opacity-60 bg-gray-50/50" : ""}`}
    >
      <div className="flex items-start gap-4">
        {/* Custom Checkbox */}
        <button
          onClick={() => onToggle({ id: todo.id, completed: !isCompleted })}
          className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            isCompleted
              ? "bg-emerald-500 border-emerald-500 text-white"
              : "border-gray-300 hover:border-emerald-400 bg-white"
          }`}
          aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
        >
          {isCompleted && <Check size={14} strokeWidth={3} />}
        </button>

        {/* Task Details */}
        <div className="flex flex-col">
          <span
            className={`text-gray-800 font-medium transition-all duration-200 ${isCompleted ? "line-through text-gray-400" : ""}`}
          >
            {todo.title}
          </span>

          {todo.due_date && (
            <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-400">
              <Calendar size={12} />
              <span>Due: {format(new Date(todo.due_date), "MMM d, yyyy")}</span>
            </div>
          )}
        </div>
      </div>

      {/* Delete Button (Visible on hover on desktop, always on mobile) */}
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-300 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
        aria-label="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
}
