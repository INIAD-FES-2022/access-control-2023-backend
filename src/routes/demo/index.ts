import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { DemoSchema } from "./schema";

const route = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DemoSchema,
        },
      },
      description: "Demo response",
    },
  },
});

const handler = new OpenAPIHono();

handler.openapi(route, (c) => {
  return c.jsonT({
    id: 1,
    name: "John Doe",
  });
});

export default handler;
