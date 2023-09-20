import { z } from "@hono/zod-openapi";

export const DemoSchema = z
  .object({
    id: z.number().openapi({
      example: 1,
    }),
    name: z.string().openapi({
      example: "John Doe",
    }),
  })
  .openapi("Demo");
