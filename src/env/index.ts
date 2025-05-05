import "dotenv/config";

import z from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) throw new Error("Invalid Environment Variables");

export const env = _env.data;
