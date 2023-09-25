import { createRoute } from "@hono/zod-openapi";
import { HistoryResponseSchema } from "schema/history";
import { DeleteParamsSchema } from "./schema";

const deleteRoute = createRoute({
  path: "/",
  method: "delete",
  description: "ユーザーの参加履歴を削除する",
  request: {
    params: DeleteParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: HistoryResponseSchema,
        },
      },
      description: "削除成功",
    },
    401: {
      description: "ユーザーの識別情報が不正",
    },
    404: {
      description: "参加履歴が存在しない",
    },
  },
});

export const routes = {
  delete: deleteRoute,
};
