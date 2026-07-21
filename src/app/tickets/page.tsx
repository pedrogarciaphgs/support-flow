import { Filter, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/sidebar";

const tickets = [
  {
    id: "SUP-001",
    title: "Erro ao acessar o sistema",
    requester: "Ana Martins",
    priority: "Alta",
    status: "Aberto",
    createdAt: "Hoje, 09:30",
  },
  {
    id: "SUP-002",
    title: "Problema na redefinição de senha",
    requester: "Carlos Silva",
    priority: "Média",
    status: "Em andamento",
    createdAt: "Hoje, 08:15",
  },
  {
    id: "SUP-003",
    title: "Computador sem acesso à internet",
    requester: "Mariana Costa",
    priority: "Alta",
    status: "Em andamento",
    createdAt: "Ontem, 16:40",
  },
  {
    id: "SUP-004",
    title: "Instalação de novo software",
    requester: "João Ferreira",
    priority: "Baixa",
    status: "Resolvido",
    createdAt: "Ontem, 14:10",
  },
];

function getPriorityStyle(priority: string) {
  switch (priority) {
    case "Alta":
      return "bg-red-100 text-red-700";
    case "Média":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getStatusStyle(status: string) {
  switch (status) {
    case "Aberto":
      return "bg-blue-100 text-blue-700";
    case "Em andamento":
      return "bg-indigo-100 text-indigo-700";
    case "Resolvido":
      return "bg-emerald-100 text-emerald-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function TicketsPage() {
  return (
    <main className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <section className="min-w-0 flex-1">
        <header className="border-b border-slate-200 bg-white px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Chamados</h1>

              <p className="text-sm text-slate-500">
                Gerencie todos os chamados do sistema
              </p>
            </div>

            <Link
              href="/tickets/new"
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              <Plus size={18} />
              Novo chamado
            </Link>
          </div>
        </header>

        <div className="p-8">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 p-6 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full md:max-w-md">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Buscar por título ou solicitante..."
                  className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-indigo-500"
                />
              </div>

              <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                <Filter size={18} />
                Filtros
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Chamado</th>
                    <th className="px-6 py-4 font-medium">Solicitante</th>
                    <th className="px-6 py-4 font-medium">Prioridade</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Criado em</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {tickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="cursor-pointer transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <span className="block text-xs font-medium text-indigo-600">
                          #{ticket.id}
                        </span>

                        <span className="mt-1 block text-sm font-medium text-slate-900">
                          {ticket.title}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {ticket.requester}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getPriorityStyle(
                            ticket.priority,
                          )}`}
                        >
                          {ticket.priority}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                            ticket.status,
                          )}`}
                        >
                          {ticket.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {ticket.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
