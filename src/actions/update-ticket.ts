"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const updateTicketSchema = z.object({
  ticketId: z.string().min(1, "Chamado inválido."),

  status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]),

  assignedToId: z.string().optional(),
});

export type UpdateTicketState = {
  success: boolean;
  message: string;
};

export async function updateTicket(
  _previousState: UpdateTicketState,
  formData: FormData,
): Promise<UpdateTicketState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Você precisa estar autenticado.",
    };
  }

  if (session.user.role !== "ADMIN" && session.user.role !== "AGENT") {
    return {
      success: false,
      message: "Você não possui permissão para atualizar chamados.",
    };
  }

  const parsedData = updateTicketSchema.safeParse({
    ticketId: formData.get("ticketId"),
    status: formData.get("status"),
    assignedToId: formData.get("assignedToId") || undefined,
  });

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.issues[0]?.message ?? "Dados inválidos.",
    };
  }

  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: parsedData.data.ticketId,
      },
      select: {
        id: true,
        status: true,
        assignedToId: true,
      },
    });

    if (!ticket) {
      return {
        success: false,
        message: "Chamado não encontrado.",
      };
    }

    if (parsedData.data.assignedToId) {
      const agent = await prisma.user.findFirst({
        where: {
          id: parsedData.data.assignedToId,
          role: {
            in: ["ADMIN", "AGENT"],
          },
        },
        select: {
          id: true,
        },
      });

      if (!agent) {
        return {
          success: false,
          message: "Atendente inválido.",
        };
      }
    }

    const newAssignedToId = parsedData.data.assignedToId ?? null;

    const historyEntries: {
      ticketId: string;
      userId: string;
      action: string;
      oldValue: string | null;
      newValue: string | null;
    }[] = [];

    if (ticket.status !== parsedData.data.status) {
      historyEntries.push({
        ticketId: ticket.id,
        userId: session.user.id,
        action: "STATUS_CHANGED",
        oldValue: ticket.status,
        newValue: parsedData.data.status,
      });
    }

    if (ticket.assignedToId !== newAssignedToId) {
      historyEntries.push({
        ticketId: ticket.id,
        userId: session.user.id,
        action: "ASSIGNEE_CHANGED",
        oldValue: ticket.assignedToId,
        newValue: newAssignedToId,
      });
    }

    await prisma.$transaction(async (tx) => {
      await tx.ticket.update({
        where: {
          id: ticket.id,
        },

        data: {
          status: parsedData.data.status,
          assignedToId: newAssignedToId,
        },
      });

      if (historyEntries.length > 0) {
        await tx.ticketHistory.createMany({
          data: historyEntries,
        });
      }
    });

    revalidatePath("/");
    revalidatePath("/tickets");
    revalidatePath(`/tickets/${ticket.id}`);

    return {
      success: true,
      message: "Chamado atualizado com sucesso!",
    };
  } catch (error) {
    console.error("Erro ao atualizar chamado:", error);

    return {
      success: false,
      message: "Não foi possível atualizar o chamado.",
    };
  }
}
