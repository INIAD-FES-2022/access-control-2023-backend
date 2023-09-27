import { OpenAPIHono } from "@hono/zod-openapi";
import { getUid } from "helper/uid";
import historyRepository from "repositories/history.repository";
import programRepository from "repositories/program.repository";
import userRepository from "repositories/user.repository";
import { HistoryResponseSchema } from "schema/history";
import { routes } from "./routes";

const handler = new OpenAPIHono();

handler.openapi(routes.post, async (c) => {
  const programId = c.req.valid("param").id;

  const program = await programRepository.findUnique(programId);

  if (!program) {
    return c.jsonT({}, 404);
  }

  const userId = getUid(c);

  if (userId === null) {
    return c.jsonT({}, 401);
  }

  const user = await userRepository.findUnique(userId);

  if (!user) {
    return c.jsonT({}, 401);
  }

  const history = await historyRepository.create({
    userId: user.id,
    programId: program.id,
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
