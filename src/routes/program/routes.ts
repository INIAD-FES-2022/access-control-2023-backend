import { createRoute } from "@hono/zod-openapi";
import { ProgramsResponseSchema } from "schema/program";

const getRoute = createRoute({
  method: "get",
  path: "/",
  description: "企画一覧を取得する",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ProgramsResponseSchema,
        },
      },
      description: "企画一覧",
    },
  },
});

export const routes = {
  get: getRoute,
};
