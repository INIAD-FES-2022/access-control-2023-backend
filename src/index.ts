import { serve } from "@hono/node-server";
import { OpenAPIHono } from "@hono/zod-openapi";
import { env } from "env";
import { logger } from "hono/logger";
import handler from "routes";

const app = new OpenAPIHono({ strict: false });

app.use("*", logger());

export const route = app.route("/api", handler);

app.doc("/docs", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Access Control Backend API",
  },
});

if (process.env.NODE_ENV !== "test") {
  serve({
    fetch: app.fetch,
    port: env.PORT,
  });
}
