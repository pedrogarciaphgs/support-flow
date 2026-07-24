"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

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

    await prisma.ticket.update({
      where: {
        id: ticket.id,
      },

      data: {
        status: parsedData.data.status,
        assignedToId: parsedData.data.assignedToId ?? null,
      },
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
