import { z } from "zod";

export const createCommentSchema = z.object({
  ticketId: z.string().min(1, "Chamado inválido."),

  content: z
    .string()
    .trim()
    .min(3, "O comentário precisa ter pelo menos 3 caracteres.")
    .max(1000, "O comentário pode ter no máximo 1000 caracteres."),
});
