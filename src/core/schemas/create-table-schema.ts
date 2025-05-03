import { z } from "zod";

export const createTableSchema = z.object({
  body: z.object({
    tableName: z
      .string()
      .min(1, { message: "O nome da mesa é obrigatório" })
      .max(30, {
        message: "O nome da mesa deve ter, no máximo, 30 caracteres.",
      }),
    ownerName: z
      .string()
      .min(1, { message: "O nome do jogador é obrigatório" })
      .max(30, {
        message: "O nome do jogador deve ter, no máximo, 30 caracteres.",
      }),
  }),
});
