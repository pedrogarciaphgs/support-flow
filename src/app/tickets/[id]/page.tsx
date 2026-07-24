import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CircleUserRound,
  MessageSquare,
  Tag,
  UserRoundCog,
} from "lucide-react";
import { CreateCommentForm } from "@/components/tickets/create-comment-form";
import { UpdateTicketForm } from "@/components/tickets/update-ticket-form";

import { Sidebar } from "@/components/layout/sidebar";
import { prisma } from "@/lib/prisma";

type TicketDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

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

function formatCategory(category: string) {
  const labels = {
    ACCESS: "Acesso",
    HARDWARE: "Hardware",
    SOFTWARE: "Software",
    NETWORK: "Rede",
    OTHER: "Outro",
  };

  return labels[category as keyof typeof labels] ?? category;
}

function getPriorityStyle(priority: string) {
  switch (priority) {
    case "URGENT":
    case "HIGH":
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

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function TicketDetailsPage({
  params,
}: TicketDetailsPageProps) {
  const { id } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: {
      id,
    },

    include: {
      requester: {
        select: {
          name: true,
          email: true,
        },
      },

      assignedTo: {
        select: {
          name: true,
          email: true,
        },
      },

      comments: {
        orderBy: {
          createdAt: "asc",
        },

        include: {
          author: {
            select: {
              name: true,
              role: true,
            },
          },
        },
      },
    },
  });

  const agents = await prisma.user.findMany({
    where: {
      role: {
        in: ["ADMIN", "AGENT"],
      },
    },

    orderBy: {
      name: "asc",
    },

    select: {
      id: true,
      name: true,
    },
  });

  if (!ticket) {
    notFound();
  }

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
              <span className="text-xs font-semibold text-indigo-600">
                #{ticket.id.slice(-6).toUpperCase()}
              </span>

              <h1 className="text-2xl font-bold text-slate-900">
                {ticket.title}
              </h1>
            </div>
          </div>
        </header>

        <div className="grid gap-8 p-8 xl:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Descrição
              </h2>

              <p className="whitespace-pre-wrap leading-7 text-slate-600">
                {ticket.description}
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <div className="flex items-center gap-3">
                  <MessageSquare size={20} className="text-indigo-600" />

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Comentários
                    </h2>

                    <p className="text-sm text-slate-500">
                      Histórico de comunicação do chamado
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 p-6">
                {ticket.comments.map((comment) => (
                  <article key={comment.id} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                      <CircleUserRound size={20} />
                    </div>

                    <div className="min-w-0 flex-1 rounded-xl bg-slate-50 p-4">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="text-sm font-semibold text-slate-900">
                            {comment.author.name}
                          </span>

                          <span className="ml-2 text-xs font-medium text-indigo-600">
                            {comment.author.role}
                          </span>
                        </div>

                        <time className="text-xs text-slate-400">
                          {formatDate(comment.createdAt)}
                        </time>
                      </div>

                      <p className="text-sm leading-6 text-slate-600">
                        {comment.content}
                      </p>
                    </div>
                  </article>
                ))}

                {ticket.comments.length === 0 && (
                  <p className="py-6 text-center text-sm text-slate-500">
                    Nenhum comentário adicionado.
                  </p>
                )}

                <CreateCommentForm ticketId={ticket.id} />
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 font-semibold text-slate-900">
              Informações do chamado
            </h2>

            <div className="space-y-6">
              <div>
                <p className="mb-2 text-xs font-medium uppercase text-slate-400">
                  Status
                </p>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                    ticket.status,
                  )}`}
                >
                  {formatStatus(ticket.status)}
                </span>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase text-slate-400">
                  Prioridade
                </p>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getPriorityStyle(
                    ticket.priority,
                  )}`}
                >
                  {formatPriority(ticket.priority)}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Tag size={18} className="mt-0.5 text-slate-400" />

                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Categoria
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {formatCategory(ticket.category)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CircleUserRound size={18} className="mt-0.5 text-slate-400" />

                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Solicitante
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {ticket.requester.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {ticket.requester.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <UserRoundCog size={18} className="mt-0.5 text-slate-400" />

                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Responsável
                  </p>

                  {ticket.assignedTo ? (
                    <>
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {ticket.assignedTo.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        {ticket.assignedTo.email}
                      </p>
                    </>
                  ) : (
                    <p className="mt-1 text-sm text-slate-500">Não atribuído</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays size={18} className="mt-0.5 text-slate-400" />

                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Criado em
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {formatDate(ticket.createdAt)}
                  </p>
                </div>
              </div>
              <UpdateTicketForm
                ticketId={ticket.id}
                currentStatus={ticket.status}
                currentAssignedToId={ticket.assignedToId}
                agents={agents}
              />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
