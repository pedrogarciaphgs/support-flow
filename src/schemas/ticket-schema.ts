import { z } from "zod";

export const createTicketSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "O título precisa ter pelo menos 5 caracteres.")
    .max(100, "O título pode ter no máximo 100 caracteres."),

  description: z
    .string()
    .trim()
    .min(10, "A descrição precisa ter pelo menos 10 caracteres.")
    .max(2000, "A descrição pode ter no máximo 2000 caracteres."),

  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),

  category: z.enum(["ACCESS", "HARDWARE", "SOFTWARE", "NETWORK", "OTHER"]),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
