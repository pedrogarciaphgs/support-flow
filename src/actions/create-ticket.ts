"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createTicketSchema } from "@/schemas/ticket-schema";

export type CreateTicketState = {
  success: boolean;
  message: string;
};

export async function createTicket(
  _previousState: CreateTicketState,
  formData: FormData,
): Promise<CreateTicketState> {
  const parsedData = createTicketSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    priority: formData.get("priority"),
    category: formData.get("category"),
  });

  if (!parsedData.success) {
    return {
      success: false,
      message:
        parsedData.error.issues[0]?.message ??
        "Os dados do chamado são inválidos.",
    };
  }

  try {
    const requester = await prisma.user.findUnique({
      where: {
        email: "carlos@supportflow.dev",
      },
    });

    if (!requester) {
      return {
        success: false,
        message: "Usuário solicitante não encontrado.",
      };
    }

    await prisma.ticket.create({
      data: {
        title: parsedData.data.title,
        description: parsedData.data.description,
        priority: parsedData.data.priority,
        category: parsedData.data.category,
        requesterId: requester.id,
      },
    });

    revalidatePath("/");
    revalidatePath("/tickets");

    return {
      success: true,
      message: "Chamado criado com sucesso!",
    };
  } catch (error) {
    console.error("Erro ao criar chamado:", error);

    return {
      success: false,
      message: "Não foi possível criar o chamado. Tente novamente.",
    };
  }
}
