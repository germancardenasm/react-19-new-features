"use client";
import { use, useState } from "react";
import { AlertCircle } from "lucide-react";
import { TodoForm } from "./todo-form";
import { TodoList } from "./todo-lists";
import { TodoFilter } from "./todo-filter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { addTodo, updateTodo, deleteTodo } from "@/lib/db";
import { Todo } from "@/types/todo";

export function TodoDashboard({
  promisedTodos,
}: {
  promisedTodos: Promise<Todo[]>;
}) {
  const fetchedTodos = use(promisedTodos);
  const [todos, setTodos] = useState<Todo[]>(fetchedTodos);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [updatingTodoId, setUpdatingTodoId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddTodo = async (_: string, formData: FormData) => {
    try {
      setError(null);
      const todo = formData.get("todo") as string;
      if (todo.trim()) {
        const newTodo = await addTodo(todo);
        setTodos([...todos, newTodo]);
      }
      return todo;
    } catch (err) {
      setError("Failed to add todo. Please try again.");
      console.error("Error adding todo:", err);
      return "";
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      setUpdatingTodoId(id);
      setError(null);
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        const updatedTodo = await updateTodo(id, {
          completed: !todoToUpdate.completed,
        });
        setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
      }
    } catch (err) {
      setError("Failed to update todo. Please try again.");
      console.error("Error updating todo:", err);
    } finally {
      setUpdatingTodoId(null);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      setUpdatingTodoId(id);
      setError(null);
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo. Please try again.");
      console.error("Error deleting todo:", err);
    } finally {
      setUpdatingTodoId(null);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <TodoForm addTodo={handleAddTodo} />
      <TodoFilter filter={filter} setFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        toggleTodo={handleToggleTodo}
        deleteTodo={handleDeleteTodo}
        updatingTodoId={updatingTodoId}
      />
      {todos.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          {todos.filter((todo) => !todo.completed).length} items left
        </div>
      )}
    </div>
  );
}
