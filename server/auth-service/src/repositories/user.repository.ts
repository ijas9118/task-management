import { PrismaClient, Users } from "@prisma/client";

import { IUserRepository } from "./IUserRepository";

export default class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  findUserByEmail = async (email: string): Promise<Users | null> => {
    return await this.prisma.users.findUnique({ where: { email } });
  };
}
