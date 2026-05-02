import { useState, useEffect, useCallback } from "react";
import { todoService } from "../services/todoService";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all todos
  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await todoService.getAll();
      setTodos(data);
    } catch (err) {
      setError(err.message || "Failed to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data on initial mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Create a new todo
  const createTodo = async (todoData) => {
    try {
      const newTodo = await todoService.create(todoData);
      // Update local state immediately with the new server response
      setTodos((prev) => [newTodo, ...prev]);
      return { success: true, data: newTodo };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Update a todo
  const updateTodo = async (updatedData) => {
    const previousTodos = [...todos];

    // 2. Update local state immediately
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === updatedData.id ? { ...todo, ...updatedData } : todo,
      ),
    );

    try {
      // 3. Send update to server
      await todoService.update(updatedData);
    } catch (err) {
      setTodos(previousTodos);
      console.error("Update failed, rolling back:", err);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    const previousTodos = [...todos];

    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    try {
      await todoService.delete(id);
    } catch (err) {
      setTodos(previousTodos);
      console.error("Delete failed, rolling back:", err);
    }
  };

  return {
    todos,
    isLoading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
  };
}
