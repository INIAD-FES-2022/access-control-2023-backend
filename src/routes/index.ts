import { OpenAPIHono } from "@hono/zod-openapi";
import demoHandler from "./demo";
import enterHandler from "./enter";
import userHandler from "./user";

const handler = new OpenAPIHono();

handler.route("/demo", demoHandler);
handler.route("/user", userHandler);
handler.route("/enter", enterHandler);

export default handler;
