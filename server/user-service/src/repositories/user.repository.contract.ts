import { User } from "@prisma/client";

export interface IUserRepository {
  createUser(data: { id: string; email: string; name: string }): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: string, data: { name: string }): Promise<User>;
}
