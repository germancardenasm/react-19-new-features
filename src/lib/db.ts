import { Todo } from "../components/todo-dashboard";
import { seedDb } from "@/lib/data";

let todos: Todo[] = seedDb;

// Simulate some delay to mimic real database operations
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getTodos(): Promise<Todo[]> {
  await delay(2000); // Simulate network delay
  return [...todos];
}

export async function addTodo(text: string): Promise<Todo> {
  await delay(100);
  const newTodo: Todo = { id: Date.now(), text, completed: false };
  todos.push(newTodo);
  return newTodo;
}

export async function updateTodo(
  id: number,
  updates: Partial<Todo>
): Promise<Todo> {
  await delay(100);
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) throw new Error("Todo not found");
  todos[index] = { ...todos[index], ...updates };
  return todos[index];
}

export async function deleteTodo(id: number): Promise<void> {
  await delay(100);
  todos = todos.filter((todo) => todo.id !== id);
}
