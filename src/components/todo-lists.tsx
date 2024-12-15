import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Todo } from "@/types/todo";

type TodoListProps = {
  todos: Todo[];
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
};

export function TodoList({ todos, toggleTodo, deleteTodo }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-500 my-4">
        No todos yet. Add one above!
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center gap-2 p-2 bg-white rounded shadow"
        >
          <Checkbox
            id={`todo-${todo.id}`}
            checked={todo.completed}
            onCheckedChange={() => toggleTodo(todo.id)}
          />
          <label
            htmlFor={`todo-${todo.id}`}
            className={`flex-grow ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.text}
          </label>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteTodo(todo.id)}
            aria-label="Delete todo"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </li>
      ))}
    </ul>
  );
}
