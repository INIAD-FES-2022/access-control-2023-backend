import { OpenAPIHono } from "@hono/zod-openapi";
import { convertHistoryResponse } from "helper/history";
import { getUid } from "helper/uid";
import prisma from "lib/prisma";
import { HistoryResponseSchema } from "schema/history";
import { routes } from "./routes";

const handler = new OpenAPIHono();

handler.openapi(routes.delete, async (c) => {
  const historyId = c.req.valid("param").id;
  const userId = getUid(c);

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

  const history = await prisma.history.findUnique({
    where: {
      id: historyId,
    },
  });

  if (!history) {
    return c.jsonT({}, 404);
  }

  const deletedHistory = await prisma.history.delete({
    where: {
      id: history.id,
    },
    include: {
      program: true,
    },
  });

  const guard = HistoryResponseSchema.parse(
    convertHistoryResponse(deletedHistory),
  );

  return c.jsonT(guard);
});

export default handler;
