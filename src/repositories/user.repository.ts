import type { PrismaClient, User } from "@prisma/client";
import prisma from "lib/prisma";

export class UserRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findUnique(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Omit<User, "id">): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  async update(id: string, data: Omit<User, "id">): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<User> {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

const userRepository = new UserRepository(prisma);

export default userRepository;
