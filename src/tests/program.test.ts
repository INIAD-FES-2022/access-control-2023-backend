import { randomUUID } from "crypto";
import { route } from "index";
import { programStore } from "repositories/__mocks__/mock-store";
import { describe, expect, it } from "vitest";

describe("Program", () => {
  const createdProgram = {
    id: randomUUID(),
    name: "program",
  };
  programStore.set(createdProgram.id, createdProgram);

  describe("[GET] /program", () => {
    it("return 200", async () => {
      const req = new Request("http://localhost/api/program", {
        method: "GET",
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual([createdProgram]);
    });
  });

  describe("[GET] /program/:id", () => {
    it("return 200", async () => {
      const req = new Request(
        `http://localhost/api/program/${createdProgram.id}`,
        {
          method: "GET",
        },
      );
      const res = await route.fetch(req);
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(createdProgram);
    });
  });

  describe("[GET] /program/:id", () => {
    it("return 404", async () => {
      const req = new Request(`http://localhost/api/program/${randomUUID()}`, {
        method: "GET",
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(404);
    });
  });
});
