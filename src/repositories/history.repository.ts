import type { History, PrismaClient, Program, User } from "@prisma/client";
import prisma from "lib/prisma";

export class HistoryRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findUnique(id: string): Promise<History | null> {
    return await this.prisma.history.findUnique({
      where: {
        id,
      },
    });
  }

  async findManyByUser(
    userId: string,
  ): Promise<({ program: Program; user: User } & History)[]> {
    return await this.prisma.history.findMany({
      where: {
        userId,
      },
      include: {
        program: true,
        user: true,
      },
    });
  }

  async create(data: Omit<History, "id" | "entryTime">): Promise<History> {
    return await this.prisma.history.create({
      data,
    });
  }

  async delete(
    id: string,
  ): Promise<{ program: Program; user: User } & History> {
    return await this.prisma.history.delete({
      where: {
        id,
      },
      include: {
        program: true,
        user: true,
      },
    });
  }
}

const historyRepository = new HistoryRepository(prisma);

export default historyRepository;
