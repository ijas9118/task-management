import { User } from "@prisma/client";

import { IUserService } from "./user.service.contract";

import { UserAlreadyExistsError } from "@/errors/UserAlreadyExistsError";
import { UserNotFoundError } from "@/errors/UserNotFoundError";
import { IUserRepository } from "@/repositories/user.repository.contract";

export default class UserService implements IUserService {
  constructor(private userRepo: IUserRepository) {}

  async createUser(data: { id: string; email: string; name: string }): Promise<User> {
    const user = await this.userRepo.findById(data.id);
    if (user) {
      throw new UserAlreadyExistsError(user.id);
    }
    return this.userRepo.createUser(data);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepo.findById(id);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  async update(id: string, data: { name: string }): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new UserNotFoundError(id);
    }
    return this.userRepo.update(id, data);
  }
}
