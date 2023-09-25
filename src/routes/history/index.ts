import { OpenAPIHono } from "@hono/zod-openapi";
import { convertHistoryResponse } from "helper/history";
import { getUid } from "helper/uid";
import prisma from "lib/prisma";
import { HistoriesResponseSchema } from "schema/history";
import historyIdHandler from "./_historyId";
import { routes } from "./routes";

const handler = new OpenAPIHono();

handler.openapi(routes.get, async (c) => {
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

  const histories = await prisma.history.findMany({
    where: {
      userId: user.id,
    },
    include: {
      program: true,
    },
  });

  const guard = HistoriesResponseSchema.parse(
    histories.map(convertHistoryResponse),
  );

  return c.jsonT(guard);
});

handler.route("/:id", historyIdHandler);

export default handler;
