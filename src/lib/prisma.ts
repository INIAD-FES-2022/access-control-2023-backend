import { PrismaClient } from "@prisma/client";
import { env } from "env";

let prisma: PrismaClient;

if (env.NODE_ENV !== "production") {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
} else {
  prisma = new PrismaClient();
}

export default prisma;
