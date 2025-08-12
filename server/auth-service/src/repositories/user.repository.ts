import { PrismaClient, Users } from "@prisma/client";

import { IUserRepository } from "./interfaces/IUserRepository";

export default class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  findUserByEmail = async (email: string): Promise<Users | null> => {
    return await this.prisma.users.findUnique({ where: { email } });
  };

  createUser = async (data: { email: string; password: string }): Promise<Users> => {
    return await this.prisma.users.create({
      data,
    });
  };
}
