import { CircleCheckBig, Clock3, Headphones, TicketCheck } from "lucide-react";

import { RecentTickets } from "@/components/dashboard/recent-tickets";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const [openTickets, inProgressTickets, resolvedTickets, totalTickets] =
    await Promise.all([
      prisma.ticket.count({
        where: {
          status: "OPEN",
        },
      }),

      prisma.ticket.count({
        where: {
          status: "IN_PROGRESS",
        },
      }),

      prisma.ticket.count({
        where: {
          status: "RESOLVED",
        },
      }),

      prisma.ticket.count(),
    ]);

  const summaryCards = [
    {
      title: "Chamados abertos",
      value: openTickets,
      description: "Aguardando atendimento",
      icon: TicketCheck,
    },
    {
      title: "Em andamento",
      value: inProgressTickets,
      description: "Sendo atendidos agora",
      icon: Headphones,
    },
    {
      title: "Resolvidos",
      value: resolvedTickets,
      description: "Chamados já solucionados",
      icon: CircleCheckBig,
    },
    {
      title: "Total de chamados",
      value: totalTickets,
      description: "Registrados no sistema",
      icon: Clock3,
    },
  ];

  return (
    <main className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <section className="min-w-0 flex-1">
        <Header />

        <div className="p-8">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => (
              <SummaryCard
                key={card.title}
                title={card.title}
                value={card.value}
                description={card.description}
                icon={card.icon}
              />
            ))}
          </div>

          <RecentTickets />
        </div>
      </section>
    </main>
  );
}
