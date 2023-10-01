/* eslint-disable */
import type * as Types from "../../@types";

export type Methods = {
  /** 企画一覧を取得する */
  get: {
    status: 200;
    /** 企画一覧 */
    resBody: Types.ProgramsResponse;
  };
};
