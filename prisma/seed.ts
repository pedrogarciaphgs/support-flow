import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // Remove os dados antigos na ordem correta por causa das relações.
  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      name: "Pedro Garcia",
      email: "pedro@supportflow.dev",
      password: "123456",
      role: "ADMIN",
    },
  });

  const agent = await prisma.user.create({
    data: {
      name: "Mariana Costa",
      email: "mariana@supportflow.dev",
      password: "123456",
      role: "AGENT",
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "Carlos Silva",
      email: "carlos@supportflow.dev",
      password: "123456",
      role: "USER",
    },
  });

  const firstTicket = await prisma.ticket.create({
    data: {
      title: "Erro ao acessar o sistema",
      description:
        "O usuário recebe uma mensagem de acesso negado ao tentar entrar no sistema.",
      category: "ACCESS",
      priority: "HIGH",
      status: "OPEN",
      requesterId: user.id,
    },
  });

  const secondTicket = await prisma.ticket.create({
    data: {
      title: "Computador sem acesso à internet",
      description:
        "O computador está conectado à rede, mas não consegue acessar nenhum site.",
      category: "NETWORK",
      priority: "URGENT",
      status: "IN_PROGRESS",
      requesterId: user.id,
      assignedToId: agent.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: "Estou verificando as configurações de rede do equipamento.",
      authorId: agent.id,
      ticketId: secondTicket.id,
    },
  });

  console.log("Seed executado com sucesso.");
  console.log({
    admin: admin.email,
    agent: agent.email,
    user: user.email,
    tickets: [firstTicket.title, secondTicket.title],
  });
}

main()
  .catch((error) => {
    console.error("Erro ao executar o seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
