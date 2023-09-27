import { randomUUID } from "crypto";
import { UserRepository } from "repositories/user.repository";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import { historyStore, userStore } from "./mock-store";

beforeEach(() => {
  mockReset(userRepository);

  userRepository.findUnique.mockImplementation(async (id) => {
    return userStore.get(id) ?? null;
  });

  userRepository.create.mockImplementation(async (data) => {
    const user = {
      ...data,
      id: randomUUID(),
    };
    userStore.set(user.id, user);
    return user;
  });

  userRepository.update.mockImplementation(async (id, data) => {
    const user = userStore.get(id);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = {
      ...user,
      ...data,
    };
    userStore.set(id, updatedUser);
    return updatedUser;
  });

  userRepository.delete.mockImplementation(async (id) => {
    const user = userStore.get(id);
    if (!user) {
      throw new Error("User not found");
    }
    userStore.delete(id);
    Array.from(historyStore.values()).forEach((history) => {
      if (history.userId === id) {
        historyStore.delete(history.id);
      }
    });
    return user;
  });
});

const userRepository = mockDeep<UserRepository>();
export default userRepository;
