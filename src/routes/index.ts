import { OpenAPIHono } from "@hono/zod-openapi";
import demoHandler from "./demo";

const handler = new OpenAPIHono();

handler.route("/demo", demoHandler);

export default handler;
