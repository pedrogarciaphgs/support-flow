"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
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
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Você precisa estar autenticado para comentar.",
    };
  }

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
    const [author, ticket] = await Promise.all([
      prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        select: {
          id: true,
        },
      }),

      prisma.ticket.findUnique({
        where: {
          id: parsedData.data.ticketId,
        },
        select: {
          id: true,
        },
      }),
    ]);

    if (!author) {
      return {
        success: false,
        message: "Usuário autenticado não encontrado.",
      };
    }

    if (!ticket) {
      return {
        success: false,
        message: "Chamado não encontrado.",
      };
    }

    await prisma.comment.create({
      data: {
        content: parsedData.data.content,
        authorId: author.id,
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
