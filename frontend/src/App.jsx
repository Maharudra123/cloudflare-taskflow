import { useTodos } from "./hooks/useTodos";
import TodoItem from "./components/TodoItem";
import AddTodoForm from "./components/AddTodoForm";
import { CheckCircle2, AlertCircle, Inbox } from "lucide-react";
import { AnimatePresence } from "framer-motion";

function App() {
  const { todos, isLoading, error, createTodo, updateTodo, deleteTodo } =
    useTodos();

  // Derived state for the status bar
  const completedCount = todos.filter((t) => Boolean(t.completed)).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-[#fafafc] text-gray-800 font-sans p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <header className="mb-8 pt-8">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="text-indigo-600" size={32} />
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              TaskFlow
            </h1>
          </div>
          <p className="text-gray-500">Manage your daily tasks efficiently.</p>
        </header>

        {/* Input Form */}
        <AddTodoForm onSubmit={createTodo} />

        {/* Status Bar */}
        {!isLoading && !error && todos.length > 0 && (
          <div className="flex items-center justify-between mb-4 text-sm font-medium text-gray-500 px-1">
            <span>
              {totalCount} Task{totalCount !== 1 ? "s" : ""}
            </span>
            <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
              {completedCount} Completed
            </span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="space-y-1">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center p-12">
              <div className="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-100">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && todos.length === 0 && (
            <div className="text-center p-16 bg-white rounded-2xl border border-dashed border-gray-200 flex flex-col items-center">
              <div className="bg-gray-50 p-4 rounded-full mb-3 text-gray-400">
                <Inbox size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No tasks yet
              </h3>
              <p className="text-gray-500 text-sm">
                Add a task above to get started.
              </p>
            </div>
          )}

          {/* List Rendering */}
          <AnimatePresence mode="popLayout">
            {!isLoading &&
              !error &&
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={updateTodo}
                  onDelete={deleteTodo}
                />
              ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
