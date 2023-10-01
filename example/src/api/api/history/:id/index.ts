/* eslint-disable */
import type * as Types from "../../../@types";

export type Methods = {
  /** ユーザーの参加履歴を削除する */
  delete: {
    status: 200;
    /** 削除成功 */
    resBody: Types.HistoryResponse;
  };
};
