import { ArrowUpRight } from "lucide-react";

import { prisma } from "@/lib/prisma";

function getPriorityStyle(priority: string) {
  switch (priority) {
    case "HIGH":
    case "URGENT":
      return "bg-red-100 text-red-700";

    case "MEDIUM":
      return "bg-yellow-100 text-yellow-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getStatusStyle(status: string) {
  switch (status) {
    case "OPEN":
      return "bg-blue-100 text-blue-700";

    case "IN_PROGRESS":
      return "bg-indigo-100 text-indigo-700";

    case "RESOLVED":
      return "bg-emerald-100 text-emerald-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function formatPriority(priority: string) {
  const labels = {
    LOW: "Baixa",
    MEDIUM: "Média",
    HIGH: "Alta",
    URGENT: "Urgente",
  };

  return labels[priority as keyof typeof labels] ?? priority;
}

function formatStatus(status: string) {
  const labels = {
    OPEN: "Aberto",
    IN_PROGRESS: "Em andamento",
    RESOLVED: "Resolvido",
    CLOSED: "Fechado",
  };

  return labels[status as keyof typeof labels] ?? status;
}

export async function RecentTickets() {
  const tickets = await prisma.ticket.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      requester: {
        select: {
          name: true,
        },
      },
    },
  });

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

        <a
          href="/tickets"
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-800"
        >
          Ver todos
          <ArrowUpRight size={16} />
        </a>
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
                    #{ticket.id.slice(-6).toUpperCase()}
                  </span>

                  <span className="mt-1 block text-sm font-medium text-slate-900">
                    {ticket.title}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {ticket.requester.name}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getPriorityStyle(
                      ticket.priority,
                    )}`}
                  >
                    {formatPriority(ticket.priority)}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                      ticket.status,
                    )}`}
                  >
                    {formatStatus(ticket.status)}
                  </span>
                </td>
              </tr>
            ))}

            {tickets.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-sm text-slate-500"
                >
                  Nenhum chamado encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
