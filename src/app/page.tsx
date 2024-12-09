import { TodoDashboard } from "@/components/todo-dashboard";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Todo Dashboard</h1>
      <TodoDashboard />
    </main>
  );
}
