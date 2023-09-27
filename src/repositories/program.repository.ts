import type { PrismaClient, Program } from "@prisma/client";
import prisma from "lib/prisma";

export class ProgramRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findUnique(id: string): Promise<Program | null> {
    return await this.prisma.program.findUnique({
      where: {
        id,
      },
    });
  }
}

const programRepository = new ProgramRepository(prisma);

export default programRepository;
