import type { User } from "@prisma/client";
import prisma from "lib/prisma";

export const userRepository = {
  async findUnique(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  },
  async create(data: Omit<User, "id">): Promise<User> {
    return await prisma.user.create({
      data,
    });
  },
  async update(id: string, data: Omit<User, "id">): Promise<User> {
    return await prisma.user.update({
      where: {
        id,
      },
      data,
    });
  },
  async delete(id: string): Promise<User> {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  },
};
