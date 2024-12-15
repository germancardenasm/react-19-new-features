import { useActionState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TodoFormProps = {
  addTodo: (prevState: string, state: FormData) => Promise<string>;
};

export function TodoForm({ addTodo }: TodoFormProps) {
  const [state, submitAction, isAdding] = useActionState(addTodo, "");

  return (
    <form action={submitAction} className="flex gap-2 mb-4">
      <Input
        type="text"
        name="todo"
        placeholder="Add a new task"
        className="flex-grow"
        disabled={isAdding}
      />
      <Button type="submit" disabled={isAdding}>
        <PlusCircle className="mr-2 h-4 w-4" /> {isAdding ? "Adding..." : "Add"}
      </Button>
    </form>
  );
}
