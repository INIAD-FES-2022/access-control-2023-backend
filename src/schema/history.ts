import { z } from "@hono/zod-openapi";
import { ProgramResponseSchema } from "./program";

export const HistoryResponseSchema = z
  .object({
    id: z.string().uuid().openapi({
      example: "00000000-0000-0000-0000-000000000000",
    }),
    entryTime: z.number().int().openapi({
      example: 1699196400000,
    }),
    program: ProgramResponseSchema,
  })
  .openapi("HistoryResponseSchema");
