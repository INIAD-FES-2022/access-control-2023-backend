import { OpenAPIHono } from "@hono/zod-openapi";
import { convertHistoryResponse } from "helper/history";
import { getUid } from "helper/uid";
import historyRepository from "repositories/history.repository";
import userRepository from "repositories/user.repository";
import { HistoriesResponseSchema } from "schema/history";
import historyIdHandler from "./_historyId";
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

  const histories = await historyRepository.findManyByUser(user.id);

  const guard = HistoriesResponseSchema.parse(
    histories.map(convertHistoryResponse),
  );

  return c.jsonT(guard);
});

handler.route("/:id", historyIdHandler);

export default handler;
