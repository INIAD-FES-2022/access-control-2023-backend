import type { AspidaClient, BasicHeaders } from "aspida";
import type { Methods as Methods_1l0ywnf } from "./api/enter/:id";
import type { Methods as Methods_1gr533x } from "./api/history";
import type { Methods as Methods_rl4289 } from "./api/history/:id";
import type { Methods as Methods_q4zhit } from "./api/program";
import type { Methods as Methods_1wrnurk } from "./api/user";

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? "" : baseURL).replace(/\/$/, "");
  const PATH0 = "/api/enter/:id";
  const PATH1 = "/api/history";
  const PATH2 = "/api/history/:id";
  const PATH3 = "/api/program";
  const PATH4 = "/api/user";
  const GET = "GET";
  const POST = "POST";
  const PUT = "PUT";
  const DELETE = "DELETE";

  return {
    api: {
      enter: {
        _id: {
          /**
           * ユーザーを企画に参加させる
           * @returns 参加履歴
           */
          post: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods_1l0ywnf["post"]["resBody"],
              BasicHeaders,
              Methods_1l0ywnf["post"]["status"]
            >(prefix, PATH0, POST, option).json(),
          /**
           * ユーザーを企画に参加させる
           * @returns 参加履歴
           */
          $post: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods_1l0ywnf["post"]["resBody"],
              BasicHeaders,
              Methods_1l0ywnf["post"]["status"]
            >(prefix, PATH0, POST, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH0}`,
        },
      },
      history: {
        _id: {
          /**
           * ユーザーの参加履歴を削除する
           * @returns 削除成功
           */
          delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods_rl4289["delete"]["resBody"],
              BasicHeaders,
              Methods_rl4289["delete"]["status"]
            >(prefix, PATH2, DELETE, option).json(),
          /**
           * ユーザーの参加履歴を削除する
           * @returns 削除成功
           */
          $delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<
              Methods_rl4289["delete"]["resBody"],
              BasicHeaders,
              Methods_rl4289["delete"]["status"]
            >(prefix, PATH2, DELETE, option)
              .json()
              .then((r) => r.body),
          $path: () => `${prefix}${PATH2}`,
        },
        /**
         * ユーザーが参加した企画一覧履歴を取得する
         * @returns ユーザーの参加履歴一覧
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods_1gr533x["get"]["resBody"],
            BasicHeaders,
            Methods_1gr533x["get"]["status"]
          >(prefix, PATH1, GET, option).json(),
        /**
         * ユーザーが参加した企画一覧履歴を取得する
         * @returns ユーザーの参加履歴一覧
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods_1gr533x["get"]["resBody"],
            BasicHeaders,
            Methods_1gr533x["get"]["status"]
          >(prefix, PATH1, GET, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH1}`,
      },
      program: {
        /**
         * 企画一覧を取得する
         * @returns 企画一覧
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods_q4zhit["get"]["resBody"],
            BasicHeaders,
            Methods_q4zhit["get"]["status"]
          >(prefix, PATH3, GET, option).json(),
        /**
         * 企画一覧を取得する
         * @returns 企画一覧
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods_q4zhit["get"]["resBody"],
            BasicHeaders,
            Methods_q4zhit["get"]["status"]
          >(prefix, PATH3, GET, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH3}`,
      },
      user: {
        /**
         * ユーザーの情報を取得する
         * @returns ユーザー情報
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods_1wrnurk["get"]["resBody"],
            BasicHeaders,
            Methods_1wrnurk["get"]["status"]
          >(prefix, PATH4, GET, option).json(),
        /**
         * ユーザーの情報を取得する
         * @returns ユーザー情報
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods_1wrnurk["get"]["resBody"],
            BasicHeaders,
            Methods_1wrnurk["get"]["status"]
          >(prefix, PATH4, GET, option)
            .json()
            .then((r) => r.body),
        /**
         * ユーザーを作成する
         * @returns 作成されたユーザー情報
         */
        post: (option: {
          body: Methods_1wrnurk["post"]["reqBody"];
          config?: T | undefined;
        }) =>
          fetch<
            Methods_1wrnurk["post"]["resBody"],
            BasicHeaders,
            Methods_1wrnurk["post"]["status"]
          >(prefix, PATH4, POST, option).json(),
        /**
         * ユーザーを作成する
         * @returns 作成されたユーザー情報
         */
        $post: (option: {
          body: Methods_1wrnurk["post"]["reqBody"];
          config?: T | undefined;
        }) =>
          fetch<
            Methods_1wrnurk["post"]["resBody"],
            BasicHeaders,
            Methods_1wrnurk["post"]["status"]
          >(prefix, PATH4, POST, option)
            .json()
            .then((r) => r.body),
        /**
         * ユーザー情報を更新する
         * @returns 更新されたユーザー情報
         */
        put: (option: {
          body: Methods_1wrnurk["put"]["reqBody"];
          config?: T | undefined;
        }) =>
          fetch<
            Methods_1wrnurk["put"]["resBody"],
            BasicHeaders,
            Methods_1wrnurk["put"]["status"]
          >(prefix, PATH4, PUT, option).json(),
        /**
         * ユーザー情報を更新する
         * @returns 更新されたユーザー情報
         */
        $put: (option: {
          body: Methods_1wrnurk["put"]["reqBody"];
          config?: T | undefined;
        }) =>
          fetch<
            Methods_1wrnurk["put"]["resBody"],
            BasicHeaders,
            Methods_1wrnurk["put"]["status"]
          >(prefix, PATH4, PUT, option)
            .json()
            .then((r) => r.body),
        /**
         * ユーザーを削除する
         * @returns ユーザーが削除された
         */
        delete: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods_1wrnurk["delete"]["resBody"],
            BasicHeaders,
            Methods_1wrnurk["delete"]["status"]
          >(prefix, PATH4, DELETE, option).json(),
        /**
         * ユーザーを削除する
         * @returns ユーザーが削除された
         */
        $delete: (option?: { config?: T | undefined } | undefined) =>
          fetch<
            Methods_1wrnurk["delete"]["resBody"],
            BasicHeaders,
            Methods_1wrnurk["delete"]["status"]
          >(prefix, PATH4, DELETE, option)
            .json()
            .then((r) => r.body),
        $path: () => `${prefix}${PATH4}`,
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
