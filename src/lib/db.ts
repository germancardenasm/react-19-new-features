"use server";
import { seedDb } from "@/lib/data";
import { Todo } from "@/types/todo";

let todos: Todo[] = seedDb;

// Simulate some delay to mimic real database operations
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getTodos(): Promise<Todo[]> {
  await delay(1000); // Simulate network delay
  return [...todos];
}

export async function addTodo(text: string): Promise<Todo> {
  await delay(1000);
  const newTodo: Todo = { id: Date.now(), text: text.trim(), completed: false };
  todos.push(newTodo);
  return newTodo;
}

export async function updateTodo(
  id: number,
  updates: Partial<Todo>
): Promise<Todo> {
  await delay(1000);
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) throw new Error("Todo not found");
  todos[index] = { ...todos[index], ...updates };
  return todos[index];
}

export async function deleteTodo(id: number): Promise<void> {
  await delay(1000);
  todos = todos.filter((todo) => todo.id !== id);
}
