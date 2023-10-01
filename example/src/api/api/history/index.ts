/* eslint-disable */
import type * as Types from "../../@types";

export type Methods = {
  /** ユーザーが参加した企画一覧履歴を取得する */
  get: {
    status: 200;
    /** ユーザーの参加履歴一覧 */
    resBody: Types.HistoryResponse;
  };
};
