import { createRoute } from "@hono/zod-openapi";
import { ProgramResponseSchema } from "schema/program";
import { GetParamsSchema } from "./schema";

const getRoute = createRoute({
  path: "/{id}",
  method: "get",
  description: "企画を取得する",
  request: {
    params: GetParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ProgramResponseSchema,
        },
      },
      description: "企画",
    },
    404: {
      description: "企画が存在しない",
    },
  },
});

export const routes = {
  get: getRoute,
};
