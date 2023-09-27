import type { Program } from "@prisma/client";
import prisma from "lib/prisma";

export const programRepository = {
  async findUnique(id: string): Promise<Program | null> {
    return await prisma.program.findUnique({
      where: {
        id,
      },
    });
  },
};
