import { createRoute } from "@hono/zod-openapi";
import { HistoryResponseSchema } from "schema/history";
import { PostParamsSchema } from "./schema";

const postRoute = createRoute({
  path: "/",
  method: "post",
  description: "ユーザーを企画に参加させる",
  request: {
    params: PostParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: HistoryResponseSchema,
        },
      },
      description: "参加履歴",
    },
    401: {
      description: "ユーザーの識別情報が不正",
    },
    404: {
      description: "企画が存在しない",
    },
  },
});

export const routes = {
  post: postRoute,
};
