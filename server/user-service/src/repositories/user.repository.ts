import { PrismaClient, User } from "@prisma/client";

import { IUserRepository } from "./user.repository.contract";

export default class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async createUser(data: { id: string; email: string; name: string }): Promise<User> {
    return this.prisma.user.create({ data: data });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async update(id: string, data: { name: string }): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: { ...data } });
  }
}
