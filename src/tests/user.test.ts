import { route } from "index";

import { describe, expect, it } from "vitest";

import { randomUUID } from "crypto";
import userRepository from "repositories/__mocks__/user.repository";

describe("User", () => {
  describe("[GET] /user", () => {
    it("return 200 with cookie", async () => {
      const user = await userRepository.create({
        age: 0,
        gender: 0,
        occupation: 0,
        home: 0,
        people: 0,
        composition: 0,
      });
      const req = new Request("http://localhost/api/user", {
        method: "GET",
        headers: {
          cookie: `uid=${user.id}`,
        },
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(user);
    });

    it("return 200 with auth header", async () => {
      const user = await userRepository.create({
        age: 0,
        gender: 0,
        occupation: 0,
        home: 0,
        people: 0,
        composition: 0,
      });
      const req = new Request("http://localhost/api/user", {
        method: "GET",
        headers: {
          authorization: `Bearer ${user.id}`,
        },
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(user);
    });

    it("return 401 without user id", async () => {
      const req = new Request("http://localhost/api/user", {
        method: "GET",
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(401);
    });

    it("return 401 with invalid user id", async () => {
      const userId = randomUUID();
      const req = new Request("http://localhost/api/user", {
        method: "GET",
        headers: {
          cookie: `uid=${userId}`,
        },
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(401);
    });
  });

  describe("[POST] /user", () => {
    it("return 200 with valid body", async () => {
      const data = {
        age: 0,
        gender: 0,
        occupation: 0,
        home: 0,
        people: 0,
        composition: 0,
      };
      const req = new Request("http://localhost/api/user", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const res = await route.fetch(req);
      const { id, ...user } = await res.json();
      expect(res.status).toBe(200);
      expect(id).toBeDefined();
      expect(user).toEqual(data);
    });

    it("return 400 with invalid body", async () => {
      const req = new Request("http://localhost/api/user", {
        method: "POST",
        body: JSON.stringify({}),
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(400);
    });

    it("return 403 with user id", async () => {
      const userId = randomUUID();
      const data = {
        age: 0,
        gender: 0,
        occupation: 0,
        home: 0,
        people: 0,
        composition: 0,
      };
      const req = new Request("http://localhost/api/user", {
        method: "POST",
        headers: {
          cookie: `uid=${userId}`,
        },
        body: JSON.stringify(data),
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(403);
    });
  });

  describe("[PUT] /user", () => {
    it("return 200 with valid body", async () => {
      const data = {
        age: 0,
        gender: 0,
        occupation: 0,
        home: 0,
        people: 0,
        composition: 0,
      };
      const user = await userRepository.create(data);
      const changedData = {
        ...data,
        age: 1,
      };
      const req = new Request("http://localhost/api/user", {
        method: "PUT",
        body: JSON.stringify(changedData),
        headers: {
          cookie: `uid=${user.id}`,
        },
      });
      const res = await route.fetch(req);
      const { id, ...updatedUser } = await res.json();
      expect(res.status).toBe(200);
      expect(id).toBe(user.id);
      expect(updatedUser).toEqual(changedData);
    });

    it("return 400 with invalid body", async () => {
      const data = {
        age: 0,
        gender: 0,
        occupation: 0,
        home: 0,
        people: 0,
        composition: 0,
      };
      const user = await userRepository.create(data);
      const req = new Request("http://localhost/api/user", {
        method: "PUT",
        body: JSON.stringify({}),
        headers: {
          cookie: `uid=${user.id}`,
        },
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(400);
    });

    it("return 401 without user id", async () => {
      const data = {
        age: 0,
        gender: 0,
        occupation: 0,
        home: 0,
        people: 0,
        composition: 0,
      };
      const req = new Request("http://localhost/api/user", {
        method: "PUT",
        body: JSON.stringify(data),
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(401);
    });

    it("return 401 with invalid user id", async () => {
      const data = {
        age: 0,
        gender: 0,
        occupation: 0,
        home: 0,
        people: 0,
        composition: 0,
      };
      const req = new Request("http://localhost/api/user", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          cookie: `uid=${randomUUID()}`,
        },
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(401);
    });
  });

  describe("[DELETE] /user", () => {
    it("return 200 with valid body", async () => {
      const data = {
        age: 0,
        gender: 0,
        occupation: 0,
        home: 0,
        people: 0,
        composition: 0,
      };
      const user = await userRepository.create(data);
      const req = new Request("http://localhost/api/user", {
        method: "DELETE",
        headers: {
          cookie: `uid=${user.id}`,
        },
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual(user);
    });

    it("return 401 without user id", async () => {
      const req = new Request("http://localhost/api/user", {
        method: "DELETE",
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(401);
    });

    it("return 401 with invalid user id", async () => {
      const userId = randomUUID();
      const req = new Request("http://localhost/api/user", {
        method: "DELETE",
        headers: {
          cookie: `uid=${userId}`,
        },
      });
      const res = await route.fetch(req);
      expect(res.status).toBe(401);
    });
  });
});
