import { route } from "index";

import { randomUUID } from "crypto";
import {
  historyStore,
  programStore,
  userStore,
} from "repositories/__mocks__/mock-store";
import { describe, expect, it } from "vitest";

describe("History", () => {
  const createdUser = {
    id: randomUUID(),
    age: 0,
    gender: 0,
    occupation: 0,
    home: 0,
    people: 0,
    composition: 0,
  };
  userStore.set(createdUser.id, createdUser);

  const createdProgram = {
    id: randomUUID(),
    name: "program",
  };
  programStore.set(createdProgram.id, createdProgram);

  const createdHistory = {
    id: randomUUID(),
    userId: createdUser.id,
    programId: createdProgram.id,
    entryTime: new Date(),
  };
  historyStore.set(createdHistory.id, createdHistory);

  describe("[GET] /history", () => {
    it("return 401 without user id", async () => {
      const req = new Request("http://localhost/api/history", {
        method: "GET",
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(401);
    });

    it("return 401 with invalid user id", async () => {
      const userId = randomUUID();
      const req = new Request("http://localhost/api/history", {
        method: "GET",
        headers: {
          cookie: `uid=${userId}`,
        },
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(401);
    });

    it("return 200 with valid user id", async () => {
      const req = new Request("http://localhost/api/history", {
        method: "GET",
        headers: {
          cookie: `uid=${createdUser.id}`,
        },
      });
      const res = await route.fetch(req);
      const expectResponse = [
        {
          id: createdHistory.id,
          entryTime: createdHistory.entryTime.getTime(),
          program: createdProgram,
        },
      ];
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(expectResponse);
    });
  });

  describe("[DELETE] /history/_historyId", () => {
    it("return 401 without user id", async () => {
      const req = new Request(
        `http://localhost/api/history/${createdHistory.id}`,
        {
          method: "DELETE",
        },
      );
      const res = await route.fetch(req);
      expect(res.status).toBe(401);
    });

    it("return 401 with invalid user id", async () => {
      const userId = randomUUID();
      const req = new Request(
        `http://localhost/api/history/${createdHistory.id}`,
        {
          method: "DELETE",
          headers: {
            cookie: `uid=${userId}`,
          },
        },
      );
      const res = await route.fetch(req);
      expect(res.status).toBe(401);
    });

    it("return 404 with invalid history id", async () => {
      const req = new Request(`http://localhost/api/history/${randomUUID()}`, {
        method: "DELETE",
        headers: {
          cookie: `uid=${createdUser.id}`,
        },
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(404);
    });
  });
});
