import { Users } from "@prisma/client";

export interface IUserRepository {
  findUserByEmail(email: string): Promise<Users | null>;
  createUser(data: { email: string; password: string }): Promise<Users>;
}
