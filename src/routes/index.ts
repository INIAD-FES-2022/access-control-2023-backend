import { OpenAPIHono } from "@hono/zod-openapi";
import enterHandler from "./enter";
import userHandler from "./user";

const handler = new OpenAPIHono();

handler.route("/user", userHandler);
handler.route("/enter", enterHandler);

export default handler;
