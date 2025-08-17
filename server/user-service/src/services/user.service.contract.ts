import { User } from "@prisma/client";

export interface IUserService {
  createUser(data: { id: string; email: string; name: string }): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: string, data: UpdateUserInput): Promise<User>;
}

export type UpdateUserInput = Partial<Pick<User, "name" | "email">>;
