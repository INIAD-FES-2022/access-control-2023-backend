import { OpenAPIHono } from "@hono/zod-openapi";
import programRepository from "repositories/program.repository";
import { ProgramsResponseSchema } from "schema/program";
import { routes } from "./routes";

const handler = new OpenAPIHono();

handler.openapi(routes.get, async (c) => {
  const programs = await programRepository.findAll();
  const guard = ProgramsResponseSchema.parse(programs);
  return c.jsonT(guard);
});

export default handler;
