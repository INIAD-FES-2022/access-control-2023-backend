import { OpenAPIHono } from "@hono/zod-openapi";
import enterHandler from "./enter";
import historyHandler from "./history";
import programHandler from "./program";
import userHandler from "./user";

const handler = new OpenAPIHono();

handler.route("/user", userHandler);
handler.route("/enter", enterHandler);
handler.route("/history", historyHandler);
handler.route("/program", programHandler);

export default handler;
