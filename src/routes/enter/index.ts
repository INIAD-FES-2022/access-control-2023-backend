import { OpenAPIHono } from "@hono/zod-openapi";
import programIdHandler from "./_programId";

const handler = new OpenAPIHono();

handler.route("", programIdHandler);

export default handler;
