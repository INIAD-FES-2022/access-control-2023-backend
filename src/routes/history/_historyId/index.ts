import { OpenAPIHono } from "@hono/zod-openapi";
import { convertHistoryResponse } from "helper/history";
import { getUid } from "helper/uid";
import { historyRepository } from "repositories/history.repository";
import { userRepository } from "repositories/user.repository";
import { HistoryResponseSchema } from "schema/history";
import { routes } from "./routes";

const handler = new OpenAPIHono();

handler.openapi(routes.delete, async (c) => {
  const historyId = c.req.valid("param").id;
  const userId = getUid(c);

  if (userId === null) {
    return c.jsonT({}, 401);
  }

  const user = await userRepository.findUnique(userId);

  if (!user) {
    return c.jsonT({}, 401);
  }

  const history = await historyRepository.findUnique(historyId);

  if (!history) {
    return c.jsonT({}, 404);
  }

  const deletedHistory = await historyRepository.delete(history.id);

  const guard = HistoryResponseSchema.parse(
    convertHistoryResponse(deletedHistory),
  );

  return c.jsonT(guard);
});

export default handler;
