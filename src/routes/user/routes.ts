import { createRoute } from "@hono/zod-openapi";
import { UserRequestSchema, UserResponseSchema } from "schema/user";

const getRoute = createRoute({
  method: "get",
  path: "/",
  description: "ユーザーの情報を取得する",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserResponseSchema,
        },
      },
      description: "ユーザー情報",
    },
    401: {
      description: "ユーザーの識別情報が不正",
    },
  },
});

const postRoute = createRoute({
  method: "post",
  path: "/",
  description: "ユーザーを作成する",
  request: {
    body: {
      content: {
        "application/json": {
          description: "ユーザー情報",
          schema: UserRequestSchema,
          required: true,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserResponseSchema,
        },
      },
      description: "作成されたユーザー情報",
    },
    403: {
      description: "既にユーザーを作成している",
    },
  },
});

const putRoute = createRoute({
  method: "put",
  path: "/",
  description: "ユーザー情報を更新する",
  request: {
    body: {
      content: {
        "application/json": {
          description: "ユーザー情報",
          schema: UserRequestSchema,
          required: true,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserResponseSchema,
        },
      },
      description: "更新されたユーザー情報",
    },
    401: {
      description: "ユーザーの識別情報が不正",
    },
  },
});

const deleteRoute = createRoute({
  method: "delete",
  path: "/",
  description: "ユーザーを削除する",
  responses: {
    200: {
      description: "ユーザーが削除された",
      content: {
        "application/json": {
          schema: UserResponseSchema,
        },
      },
    },
    401: {
      description: "ユーザーの識別情報が不正",
    },
  },
});

export const routes = {
  get: getRoute,
  post: postRoute,
  put: putRoute,
  delete: deleteRoute,
};
