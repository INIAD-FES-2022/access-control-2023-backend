import { route } from "index";

import { describe, expect, it } from "vitest";

import { randomUUID } from "crypto";
import { programStore } from "repositories/__mocks__/mock-store";
import userRepository from "repositories/__mocks__/user.repository";

describe("Enter", () => {
  const createdProgram = randomUUID();
  programStore.set(createdProgram, {
    id: createdProgram,
    name: "program",
  });

  describe("[POST] /enter/_programId", () => {
    it("return 400 with invalid program id", async () => {
      const programId = "invalid";
      const req = new Request(`http://localhost/api/enter/${programId}`, {
        method: "POST",
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(400);
    });

    it("return 404 with invalid program id", async () => {
      const programId = randomUUID();
      const req = new Request(`http://localhost/api/enter/${programId}`, {
        method: "POST",
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(404);
    });

    it("return 401 without user id", async () => {
      const req = new Request(`http://localhost/api/enter/${createdProgram}`, {
        method: "POST",
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(401);
    });

    it("return 401 with invalid user id", async () => {
      const userId = randomUUID();
      const req = new Request(`http://localhost/api/enter/${createdProgram}`, {
        method: "POST",
        headers: {
          cookie: `uid=${userId}`,
        },
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(401);
    });

    it("return 200 with valid program id and user id", async () => {
      const user = await userRepository.create({
        age: 0,
        gender: 0,
        occupation: 0,
        home: 0,
        people: 0,
        composition: 0,
      });
      const req = new Request(`http://localhost/api/enter/${createdProgram}`, {
        method: "POST",
        headers: {
          cookie: `uid=${user.id}`,
        },
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(200);
    });
  });
});
