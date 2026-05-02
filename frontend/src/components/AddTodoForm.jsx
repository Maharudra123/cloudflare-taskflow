import { useState } from "react";
import { Plus } from "lucide-react";

export default function AddTodoForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);

    await onSubmit({
      title: title.trim(),
      due_date: dueDate || null,
    });

    // Reset form on success
    setTitle("");
    setDueDate("");
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-3"
    >
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-4 py-2.5 outline-none rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-300 transition-colors placeholder:text-gray-400"
        disabled={isSubmitting}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="px-4 py-2.5 outline-none rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-indigo-300 text-gray-600 transition-colors cursor-pointer"
        disabled={isSubmitting}
      />
      <button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        {isSubmitting ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
