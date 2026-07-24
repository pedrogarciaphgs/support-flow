"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { createCommentSchema } from "@/schemas/comment-schema";

export type CreateCommentState = {
  success: boolean;
  message: string;
};

export async function createComment(
  _previousState: CreateCommentState,
  formData: FormData,
): Promise<CreateCommentState> {
  const parsedData = createCommentSchema.safeParse({
    ticketId: formData.get("ticketId"),
    content: formData.get("content"),
  });

  if (!parsedData.success) {
    return {
      success: false,
      message:
        parsedData.error.issues[0]?.message ??
        "Os dados do comentário são inválidos.",
    };
  }

  try {
    const agent = await prisma.user.findUnique({
      where: {
        email: "mariana@supportflow.dev",
      },
    });

    if (!agent) {
      return {
        success: false,
        message: "Usuário responsável não encontrado.",
      };
    }

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

    await prisma.comment.create({
      data: {
        content: parsedData.data.content,
        authorId: agent.id,
        ticketId: ticket.id,
      },
    });

    revalidatePath(`/tickets/${ticket.id}`);

    return {
      success: true,
      message: "Comentário adicionado com sucesso!",
    };
  } catch (error) {
    console.error("Erro ao criar comentário:", error);

    return {
      success: false,
      message: "Não foi possível adicionar o comentário.",
    };
  }
}
