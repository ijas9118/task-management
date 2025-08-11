import { hash } from "bcryptjs";

import { IUserRepository } from "@/repositories/IUserRepository";
import { AppError } from "@/utils/app-error";

export default class AuthService {
  constructor(private userRepository: IUserRepository) {}

  register = async (
    email: string,
    name: string,
    password: string
  ): Promise<{ hashed: string; otp: number }> => {
    const existingUser = await this.userRepository.findUserByEmail(email);

    if (existingUser) {
      throw new AppError("User Already Exists", 400);
    }

    const hashed = await hash(password, 10);

    const otp = Math.floor(1000 + Math.random() * 9000);

    return { hashed, otp };
  };
}
