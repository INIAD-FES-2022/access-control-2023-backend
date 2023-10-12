import { OpenAPIHono } from "@hono/zod-openapi";
import programRepository from "repositories/program.repository";
import { ProgramResponseSchema } from "schema/program";
import { routes } from "./routes";

const handler = new OpenAPIHono();

handler.openapi(routes.get, async (c) => {
  const programId = c.req.valid("param").id;

  const program = await programRepository.findUnique(programId);

  if (!program) {
    return c.jsonT({}, 404);
  }

  const guard = ProgramResponseSchema.parse(program);

  return c.jsonT(guard);
});

export default handler;
