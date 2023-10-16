import { createRoute } from "@hono/zod-openapi";
import { HistoriesResponseSchema } from "schema/history";

const getRoute = createRoute({
  method: "get",
  path: "/",
  description: "ユーザーが参加した企画一覧履歴を取得する",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: HistoriesResponseSchema,
        },
      },
      description: "ユーザーの参加履歴一覧",
    },
    401: {
      description: "ユーザーの識別情報が不正",
    },
  },
});

export const routes = {
  get: getRoute,
};
