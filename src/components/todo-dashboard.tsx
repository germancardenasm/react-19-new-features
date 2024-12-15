"use client";
import { use, useOptimistic, useState } from "react";
import { AlertCircle } from "lucide-react";
import { TodoForm } from "./todo-form";
import { TodoList } from "./todo-lists";
import { TodoFilter } from "./todo-filter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { addTodo, updateTodo, deleteTodo } from "@/lib/db";
import { Todo } from "@/types/todo";

type Action = "ADD_TODO" | "DELETE_TODO" | "TOGGLE_TODO";

type Reducer = { type: Action; todo: Todo };

const reducer = (
  state: Todo[],
  { type, todo }: { type: Action; todo: Todo }
) => {
  switch (type) {
    case "ADD_TODO":
      return [...state, todo];
    case "DELETE_TODO":
      return state.filter((currentTodo) => currentTodo.id !== todo.id);
    case "TOGGLE_TODO":
      return state.map((currentTodo) =>
        currentTodo.id === todo.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};

export function TodoDashboard({
  promisedTodos,
}: {
  promisedTodos: Promise<Todo[]>;
}) {
  const fetchedTodos = use(promisedTodos);
   const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [error, setError] = useState<string | null>(null);
    const [optimisticTodos, setOptimisticTodo] = useOptimistic<Todo[], Reducer>(
    fetchedTodos,
    reducer
  );

  const handleAddTodo = async (_: string, formData: FormData) => {
    try {
      setError(null);
      const todo = formData.get("todo") as string;
      if (todo.trim()) {
        setOptimisticTodo({
          todo: { id: Date.now(), text: todo.trim(), completed: false },
          type: "ADD_TODO",
        });
        await addTodo(todo);
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
      setError(null);
      const todoToUpdate = optimisticTodos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        setOptimisticTodo({
          todo: todoToUpdate,
          type: "TOGGLE_TODO",
        });

        await updateTodo(id, {
          completed: !todoToUpdate.completed,
        });
      }
    } catch (err) {
      setError("Failed to update todo. Please try again.");
      console.error("Error updating todo:", err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      const todoToDelete = optimisticTodos.find((todo) => todo.id === id)!;
      setOptimisticTodo({
        todo: todoToDelete,
        type: "DELETE_TODO",
      });
      setError(null);
      await deleteTodo(id);
    } catch (err) {
      setError("Failed to delete todo. Please try again.");
      console.error("Error deleting todo:", err);
    }
  };

  const filteredTodos = optimisticTodos.filter((todo) => {
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
      />
      {optimisticTodos.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          {optimisticTodos.filter((todo) => !todo.completed).length} items left
        </div>
      )}
    </div>
  );
}
