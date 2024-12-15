import { TodoDashboard } from "@/components/todo-dashboard";
import { getTodos } from "@/lib/db";
import { Suspense } from "react";

export default async function Home() {
  const promisedTodos =  getTodos();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Todo Dashboard</h1>
      <Suspense fallback={<div className="text-center mt-8">Loading todos...</div>}>
        <TodoDashboard promisedTodos={promisedTodos} />
      </Suspense>
    </main>
  );
}
export const dynamic = "force-dynamic";
