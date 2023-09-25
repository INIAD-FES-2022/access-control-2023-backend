import { OpenAPIHono } from "@hono/zod-openapi";
import { getUid } from "helper/uid";
import prisma from "lib/prisma";
import { HistoryResponseSchema } from "schema/history";
import { routes } from "./routes";

const handler = new OpenAPIHono();

handler.openapi(routes.post, async (c) => {
  const programId = c.req.valid("param").id;

  const program = await prisma.program.findUnique({
    where: {
      id: programId,
    },
  });

  if (!program) {
    return c.jsonT({}, 404);
  }

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

  const history = await prisma.history.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      program: {
        connect: {
          id: program.id,
        },
      },
    },
  });

  const historyResponse = {
    id: history.id,
    entryTime: history.entryTime.getTime(),
    program,
  };

  const guard = HistoryResponseSchema.parse(historyResponse);

  return c.jsonT(guard);
});

export default handler;
