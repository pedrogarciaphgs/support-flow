import { CircleCheckBig, Clock3, Headphones, TicketCheck } from "lucide-react";

import { SummaryCard } from "@/components/dashboard/summary-card";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

const summaryCards = [
  {
    title: "Chamados abertos",
    value: 24,
    description: "Aguardando atendimento",
    icon: TicketCheck,
  },
  {
    title: "Em andamento",
    value: 12,
    description: "Sendo atendidos agora",
    icon: Headphones,
  },
  {
    title: "Resolvidos",
    value: 48,
    description: "Resolvidos neste mês",
    icon: CircleCheckBig,
  },
  {
    title: "Tempo médio",
    value: 3,
    description: "Horas por atendimento",
    icon: Clock3,
  },
];

export default function Home() {
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
        </div>
      </section>
    </main>
  );
}
