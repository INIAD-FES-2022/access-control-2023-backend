/* eslint-disable */
import type * as Types from "../../../@types";

export type Methods = {
  /** ユーザーを企画に参加させる */
  post: {
    status: 200;
    /** 参加履歴 */
    resBody: Types.HistoryResponse;
  };
};
