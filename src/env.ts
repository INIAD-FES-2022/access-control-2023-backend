import { parseEnv } from "znv";
import { z } from "zod";

export const env = parseEnv(process.env, {
  PORT: z.number().default(8080),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  CORS_ORIGIN: z.string().default(""),
  DOMAIN: z.string().default(""),
});
