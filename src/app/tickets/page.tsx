import Link from "next/link";
import { Plus } from "lucide-react";

import { Sidebar } from "@/components/layout/sidebar";
import { TicketFilters } from "@/components/tickets/ticket-filters";
import { prisma } from "@/lib/prisma";

type TicketsPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
    priority?: string;
  }>;
};

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

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export default async function TicketsPage({ searchParams }: TicketsPageProps) {
  const filters = await searchParams;

  const search = filters.search?.trim() ?? "";
  const status = filters.status;
  const priority = filters.priority;

  const tickets = await prisma.ticket.findMany({
    where: {
      ...(status
        ? {
            status: status as "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED",
          }
        : {}),

      ...(priority
        ? {
            priority: priority as "LOW" | "MEDIUM" | "HIGH" | "URGENT",
          }
        : {}),

      ...(search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                requester: {
                  is: {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
              },
            ],
          }
        : {}),
    },

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
            <TicketFilters />

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
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <Link
                          href={`/tickets/${ticket.id}`}
                          className="group block"
                        >
                          <span className="block text-xs font-medium text-indigo-600">
                            #{ticket.id.slice(-6).toUpperCase()}
                          </span>

                          <span className="mt-1 block text-sm font-medium text-slate-900 transition group-hover:text-indigo-600">
                            {ticket.title}
                          </span>
                        </Link>
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

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {formatDate(ticket.createdAt)}
                      </td>
                    </tr>
                  ))}

                  {tickets.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-10 text-center text-sm text-slate-500"
                      >
                        {search || status || priority
                          ? "Nenhum chamado corresponde aos filtros selecionados."
                          : "Nenhum chamado encontrado."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
