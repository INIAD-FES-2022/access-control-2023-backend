import { OpenAPIHono } from "@hono/zod-openapi";
import { deleteUidCookie, getUid, setUidCookie } from "helper/uid";
import userRepository from "repositories/user.repository";
import { UserResponseSchema } from "schema/user";
import { routes } from "./routes";

const handler = new OpenAPIHono();

handler.openapi(routes.get, async (c) => {
  const userId = getUid(c);

  if (userId === null) {
    return c.jsonT({}, 401);
  }

  const user = await userRepository.findUnique(userId);

  if (!user) {
    return c.jsonT({}, 401);
  }

  const guard = UserResponseSchema.parse(user);

  return c.jsonT(guard);
});

handler.openapi(routes.post, async (c) => {
  const userId = getUid(c);

  if (userId !== null) {
    return c.jsonT({}, 403);
  }

  const req = c.req.valid("json");

  const user = await userRepository.create(req);

  setUidCookie(c, user.id);

  const guard = UserResponseSchema.parse(user);

  return c.jsonT(guard);
});

handler.openapi(routes.put, async (c) => {
  const userId = getUid(c);

  if (userId === null) {
    return c.jsonT({}, 401);
  }

  const req = c.req.valid("json");

  const user = await userRepository.findUnique(userId);

  if (!user) {
    return c.jsonT({}, 401);
  }

  const updatedUser = await userRepository.update(userId, req);

  const guard = UserResponseSchema.parse(updatedUser);

  return c.jsonT(guard);
});

handler.openapi(routes.delete, async (c) => {
  const userId = getUid(c);

  if (userId === null) {
    return c.jsonT({}, 401);
  }
  deleteUidCookie(c);

  const user = await userRepository.findUnique(userId);

  if (!user) {
    return c.jsonT({}, 401);
  }

  const deletedUser = await userRepository.delete(userId);

  const guard = UserResponseSchema.parse(deletedUser);

  return c.jsonT(guard);
});

export default handler;
