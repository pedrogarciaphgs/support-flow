import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "O nome precisa ter pelo menos 3 caracteres.")
    .max(100, "O nome pode ter no máximo 100 caracteres."),

  email: z
    .string()
    .trim()
    .email("Informe um email válido.")
    .transform((email) => email.toLowerCase()),

  password: z
    .string()
    .min(6, "A senha precisa ter pelo menos 6 caracteres.")
    .max(100, "A senha pode ter no máximo 100 caracteres."),

  role: z.enum(["ADMIN", "AGENT", "USER"]),
});
