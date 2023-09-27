import type { History, Program, User } from "@prisma/client";
import prisma from "lib/prisma";

export const historyRepository = {
  async findUnique(id: string): Promise<History | null> {
    return await prisma.history.findUnique({
      where: {
        id,
      },
    });
  },
  async findMany(
    userId: string,
  ): Promise<({ program: Program; user: User } & History)[]> {
    return await prisma.history.findMany({
      where: {
        userId,
      },
      include: {
        program: true,
        user: true,
      },
    });
  },
  async create(data: Omit<History, "id" | "entryTime">): Promise<History> {
    return await prisma.history.create({
      data,
    });
  },
  async delete(
    id: string,
  ): Promise<{ program: Program; user: User } & History> {
    return await prisma.history.delete({
      where: {
        id,
      },
      include: {
        program: true,
        user: true,
      },
    });
  },
};
