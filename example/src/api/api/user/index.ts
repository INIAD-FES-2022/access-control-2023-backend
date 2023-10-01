/* eslint-disable */
import type * as Types from "../../@types";

export type Methods = {
  /** ユーザーの情報を取得する */
  get: {
    status: 200;
    /** ユーザー情報 */
    resBody: Types.UserResponse;
  };

  /** ユーザーを作成する */
  post: {
    status: 200;
    /** 作成されたユーザー情報 */
    resBody: Types.UserResponse;
    reqBody: Types.UserRequest;
  };

  /** ユーザー情報を更新する */
  put: {
    status: 200;
    /** 更新されたユーザー情報 */
    resBody: Types.UserResponse;
    reqBody: Types.UserRequest;
  };

  /** ユーザーを削除する */
  delete: {
    status: 200;
    /** ユーザーが削除された */
    resBody: Types.UserResponse;
  };
};
