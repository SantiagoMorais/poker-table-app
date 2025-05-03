import { z } from "zod";

export const createTableInput = z.object({
  tableName: z.string().min(1),
  ownerName: z.string().min(1),
});

export type TCreateTableInputDTO = z.infer<typeof createTableInput>;
