import { OpenAPIHono } from "@hono/zod-openapi";
import { Prisma } from "@prisma/client";
import { deleteUidCookie, getUidCookie, setUidCookie } from "helper/uid-cookie";
import prisma from "lib/prisma";
import { UserResponseSchema } from "schema/user";
import { routes } from "./routes";

const handler = new OpenAPIHono();

handler.openapi(routes.get, async (c) => {
  const userId = await getUidCookie(c);

  if (userId === null) {
    return c.jsonT({}, 401);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return c.jsonT({}, 401);
  }

  const guard = UserResponseSchema.parse(user);

  return c.jsonT(guard);
});

handler.openapi(routes.post, async (c) => {
  const userId = await getUidCookie(c);

  if (userId !== null) {
    return c.jsonT({}, 403);
  }

  const req = c.req.valid("json");

  const user = await prisma.user.create({
    data: req,
  });

  await setUidCookie(c, user.id);

  const guard = UserResponseSchema.parse(user);

  return c.jsonT(guard);
});

handler.openapi(routes.put, async (c) => {
  const userId = await getUidCookie(c);

  if (userId === null) {
    return c.jsonT({}, 401);
  }

  const req = c.req.valid("json");

  const user = await prisma.user
    .update({
      where: {
        id: userId,
      },
      data: req,
    })
    .catch((e: unknown) => {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          return null;
        }
      }
      throw e;
    });

  if (!user) {
    return c.jsonT({}, 401);
  }

  const guard = UserResponseSchema.parse(user);

  return c.jsonT(guard);
});

handler.openapi(routes.delete, async (c) => {
  const userId = await getUidCookie(c);

  if (userId === null) {
    return c.jsonT({}, 401);
  }

  const result = await prisma.user
    .delete({
      where: {
        id: userId,
      },
    })
    .then(() => {
      deleteUidCookie(c);
    })
    .catch((e: unknown) => {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          return null;
        }
      }
      throw e;
    });

  if (!result) {
    return c.jsonT({}, 401);
  }

  return c.jsonT({});
});

export default handler;
