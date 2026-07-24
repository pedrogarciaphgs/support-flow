import Link from "next/link";
import { CircleAlert } from "lucide-react";

export default function TicketNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
          <CircleAlert size={26} />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Chamado não encontrado
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          O chamado pode ter sido removido ou o endereço informado é inválido.
        </p>

        <Link
          href="/tickets"
          className="mt-6 inline-flex rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Voltar para chamados
        </Link>
      </div>
    </main>
  );
}
