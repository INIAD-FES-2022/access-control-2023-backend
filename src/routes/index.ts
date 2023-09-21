import { OpenAPIHono } from "@hono/zod-openapi";
import demoHandler from "./demo";
import userHandler from "./user";

const handler = new OpenAPIHono();

handler.route("/demo", demoHandler);
handler.route("/user", userHandler);

export default handler;
