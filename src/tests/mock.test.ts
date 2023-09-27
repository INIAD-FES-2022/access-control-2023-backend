import { describe, expect, it } from "vitest";

import { randomUUID } from "crypto";
import {
  historyStore,
  programStore,
  userStore,
} from "repositories/__mocks__/mock-store";
import historyRepository from "../repositories/__mocks__/history.repository";
import programRepository from "../repositories/__mocks__/program.repository";
import userRepository from "../repositories/__mocks__/user.repository";

describe("Mock", () => {
  const createdUsers = [randomUUID(), randomUUID(), randomUUID()];
  createdUsers.forEach((id, idx) => {
    userStore.set(id, {
      id,
      age: idx,
      gender: idx,
      occupation: idx,
      home: idx,
      people: idx,
      composition: idx,
    });
  });

  const createdPrograms = [randomUUID(), randomUUID(), randomUUID()];
  createdPrograms.forEach((id, idx) => {
    programStore.set(id, {
      id,
      name: `program ${idx}`,
    });
  });

  describe("User", () => {
    it("find user", async () => {
      for (const user of createdUsers) {
        const foundUser = await userRepository.findUnique(user);
        expect(foundUser).toEqual(userStore.get(user));
      }
    });

    it("not found user", async () => {
      const id = randomUUID();
      const user = await userRepository.findUnique(id);
      expect(user).toBeNull();
    });

    it("create user", async () => {
      const data = {
        age: 0,
        gender: 0,
        occupation: 0,
        home: 0,
        people: 0,
        composition: 0,
      };
      const user = await userRepository.create(data);
      const { id, ...rest } = user;
      expect(id).toBeDefined();
      expect(rest).toEqual(data);
      expect(userStore.get(id)).toEqual(user);
    });

    it("update user", async () => {
      const data = {
        age: 0,
        gender: 0,
        occupation: 0,
        home: 0,
        people: 0,
        composition: 0,
      };
      const user = await userRepository.create(data);
      expect(userStore.get(user.id)).toEqual(user);
      const updatedData = {
        age: 1,
        gender: 1,
        occupation: 1,
        home: 1,
        people: 1,
        composition: 1,
      };
      const updatedUser = await userRepository.update(user.id, updatedData);
      expect(updatedUser).toEqual({
        ...user,
        ...updatedData,
      });
      expect(userStore.get(user.id)).toEqual(updatedUser);
    });

    it("fail to update user", async () => {
      const id = randomUUID();
      const data = {
        age: 0,
        gender: 0,
        occupation: 0,
        home: 0,
        people: 0,
        composition: 0,
      };
      await expect(userRepository.update(id, data)).rejects.toThrow(
        "User not found",
      );
      expect(userStore.get(id)).toBeUndefined();
    });

    it("delete user", async () => {
      const data = {
        age: 0,
        gender: 0,
        occupation: 0,
        home: 0,
        people: 0,
        composition: 0,
      };
      const user = await userRepository.create(data);
      expect(userStore.get(user.id)).toEqual(user);
      const deletedUser = await userRepository.delete(user.id);
      expect(deletedUser).toEqual(user);
      expect(userStore.get(user.id)).toBeUndefined();
    });

    it("delete user with histories", async () => {
      const data = {
        age: 0,
        gender: 0,
        occupation: 0,
        home: 0,
        people: 0,
        composition: 0,
      };
      const user = await userRepository.create(data);
      expect(userStore.get(user.id)).toEqual(user);
      const program = {
        id: randomUUID(),
        name: "test program",
      };
      programStore.set(program.id, program);
      const history = await historyRepository.create({
        userId: user.id,
        programId: program.id,
      });
      expect(historyStore.get(history.id)).toEqual(history);
      const deletedUser = await userRepository.delete(user.id);
      expect(deletedUser).toEqual(user);
      expect(userStore.get(user.id)).toBeUndefined();
      expect(historyStore.get(history.id)).toBeUndefined();
    });

    it("fail to delete user", async () => {
      const id = randomUUID();
      await expect(userRepository.delete(id)).rejects.toThrow("User not found");
      expect(userStore.get(id)).toBeUndefined();
    });
  });

  describe("Program", () => {
    it("find program", async () => {
      for (const program of createdPrograms) {
        const foundProgram = await programRepository.findUnique(program);
        expect(foundProgram).toEqual(programStore.get(program));
      }
    });

    it("not found program", async () => {
      const id = randomUUID();
      const program = await programRepository.findUnique(id);
      expect(program).toBeNull();
    });
  });

  describe("History", () => {
    it("create history", async () => {
      for (const user of createdUsers) {
        for (const program of createdPrograms) {
          const data = {
            userId: user,
            programId: program,
          };
          const history = await historyRepository.create(data);
          const { id, entryTime, ...rest } = history;
          expect(id).toBeDefined();
          expect(rest).toEqual(data);
          expect(entryTime).toBeInstanceOf(Date);
          expect(historyStore.get(id)).toEqual(history);
        }
      }
    });

    it("fail to create history", async () => {
      const user = randomUUID();
      const program = randomUUID();
      const data = {
        userId: user,
        programId: program,
      };
      await expect(historyRepository.create(data)).rejects.toThrow(
        "Program or user not found",
      );
    });

    it("find history", async () => {
      const userData = {
        age: 0,
        gender: 0,
        occupation: 0,
        home: 0,
        people: 0,
        composition: 0,
      };
      const user = await userRepository.create(userData);
      const program = {
        id: randomUUID(),
        name: "test program",
      };
      programStore.set(program.id, program);
      const data = {
        userId: user.id,
        programId: program.id,
      };
      const history = await historyRepository.create(data);
      const foundHistory = await historyRepository.findUnique(history.id);
      expect(foundHistory).toEqual(history);
    });

    it("not found history", async () => {
      const id = randomUUID();
      const history = await historyRepository.findUnique(id);
      expect(history).toBeNull();
    });

    it("find histories by user", async () => {
      for (const user of createdUsers) {
        const histories = await historyRepository.findManyByUser(user);
        for (const history of histories) {
          history.user.id === user;
          createdPrograms.includes(
            history.program
              .id as `${string}-${string}-${string}-${string}-${string}`,
          );
        }
      }
    });

    it("not found histories by user", async () => {
      const data = {
        age: 0,
        gender: 0,
        occupation: 0,
        home: 0,
        people: 0,
        composition: 0,
      };
      const user = await userRepository.create(data);
      const histories = await historyRepository.findManyByUser(user.id);
      expect(histories).toEqual([]);
    });

    it("fail to find histories by user", async () => {
      const id = randomUUID();
      await expect(historyRepository.findManyByUser(id)).rejects.toThrow(
        "User not found",
      );
    });
  });
});
