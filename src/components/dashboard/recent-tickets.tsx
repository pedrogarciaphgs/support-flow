import { ArrowUpRight } from "lucide-react";

const tickets = [
  {
    id: "#SUP-001",
    title: "Erro ao acessar o sistema",
    requester: "Ana Martins",
    priority: "Alta",
    status: "Aberto",
  },
  {
    id: "#SUP-002",
    title: "Problema na redefinição de senha",
    requester: "Carlos Silva",
    priority: "Média",
    status: "Em andamento",
  },
  {
    id: "#SUP-003",
    title: "Computador sem acesso à internet",
    requester: "Mariana Costa",
    priority: "Alta",
    status: "Em andamento",
  },
  {
    id: "#SUP-004",
    title: "Instalação de novo software",
    requester: "João Ferreira",
    priority: "Baixa",
    status: "Resolvido",
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

export function RecentTickets() {
  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Chamados recentes
          </h2>

          <p className="text-sm text-slate-500">
            Últimos chamados registrados no sistema
          </p>
        </div>

        <button className="flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-800">
          Ver todos
          <ArrowUpRight size={16} />
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
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="transition hover:bg-slate-50">
                <td className="px-6 py-4">
                  <span className="block text-xs font-medium text-indigo-600">
                    {ticket.id}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
