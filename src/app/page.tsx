import { Sidebar } from "@/components/layout/sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <section className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

        <p className="mt-1 text-slate-500">Visão geral do sistema de suporte</p>
      </section>
    </main>
  );
}
