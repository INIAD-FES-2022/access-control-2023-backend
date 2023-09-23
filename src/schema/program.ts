import { z } from "@hono/zod-openapi";

export const ProgramResponseSchema = z
  .object({
    id: z.string().uuid().openapi({
      example: "00000000-0000-0000-0000-000000000000",
    }),
    name: z.string().openapi({
      example: "企画名",
    }),
  })
  .openapi("ProgramResponseSchema");
