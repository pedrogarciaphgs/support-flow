import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Sidebar } from "@/components/layout/sidebar";
import { CreateTicketForm } from "@/components/tickets/create-ticket-form";

export default function NewTicketPage() {
  return (
    <main className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <section className="min-w-0 flex-1">
        <header className="border-b border-slate-200 bg-white px-8 py-5">
          <div className="flex items-center gap-4">
            <Link
              href="/tickets"
              className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Novo chamado
              </h1>

              <p className="text-sm text-slate-500">
                Registre uma nova solicitação de suporte
              </p>
            </div>
          </div>
        </header>

        <div className="p-8">
          <CreateTicketForm />
        </div>
      </section>
    </main>
  );
}
