import type { History, Program, User } from "@prisma/client";
import { HistoryResponseSchema } from "schema/history";

export type HistoryModel = History & {
  program: Program;
  user?: User;
};

export const convertHistoryResponse = (history: HistoryModel) => {
  const { id, entryTime, program } = history;

  const historyResponse = {
    id,
    entryTime: entryTime.getTime(),
    program,
  };

  const guard = HistoryResponseSchema.parse(historyResponse);

  return guard;
};
