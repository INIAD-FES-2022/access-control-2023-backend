import type { Prisma } from "@prisma/client";

declare global {
  // biome-ignore lint: lint/style/noVar
  var prisma: Prisma;
}
