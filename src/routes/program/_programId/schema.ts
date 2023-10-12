import { z } from "@hono/zod-openapi";

export const GetParamsSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "00000000-0000-0000-0000-000000000000",
    }),
});
