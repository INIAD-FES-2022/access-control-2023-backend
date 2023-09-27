import { randomUUID } from "crypto";
import { HistoryRepository } from "repositories/history.repository";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { historyStore, programStore, userStore } from "./mock-store";

beforeEach(() => {
  mockReset(historyRepository);

  historyRepository.findUnique.mockImplementation(async (id) => {
    return historyStore.get(id) ?? null;
  });

  historyRepository.findManyByUser.mockImplementation(async (userId) => {
    const user = userStore.get(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const histories = Array.from(historyStore.values()).filter(
      (history) => history.userId === userId,
    );
    return histories.map((history) => {
      const program = programStore.get(history.programId);
      if (!program) {
        throw new Error("Program not found");
      }
      return {
        ...history,
        program,
        user,
      };
    });
  });

  historyRepository.create.mockImplementation(async (data) => {
    const history = {
      ...data,
      id: randomUUID(),
      entryTime: new Date(),
    };
    if (
      !programStore.has(history.programId) ||
      !userStore.has(history.userId)
    ) {
      throw new Error("Program or user not found");
    }
    historyStore.set(history.id, history);
    return history;
  });

  historyRepository.delete.mockImplementation(async (id) => {
    const history = historyStore.get(id);
    if (!history) {
      throw new Error("History not found");
    }
    const user = userStore.get(history.userId);
    const program = programStore.get(history.programId);
    if (!user || !program) {
      throw new Error("Program or user not found");
    }
    historyStore.delete(id);
    return {
      ...history,
      user,
      program,
    };
  });
});

const historyRepository = mockDeep<HistoryRepository>();
export default historyRepository;
