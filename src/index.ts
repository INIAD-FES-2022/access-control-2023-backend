import { serve } from "@hono/node-server";
import { env } from "env";
import { Hono } from "hono";

const app = new Hono({ strict: false });
app.get("/", (c) => c.text("Hello Hono!"));

serve({
  fetch: app.fetch,
  port: env.PORT,
});
