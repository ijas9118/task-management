import crypto from "node:crypto";

import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";

import { IAuthService } from "./interfaces/IAuthService";

import { config } from "@/config/config";
import logger from "@/config/logger";
import redisClient from "@/config/redis";
import { IRefreshTokenRepository } from "@/repositories/interfaces/IRefreshTokenRepository";
import { IUserRepository } from "@/repositories/interfaces/IUserRepository";
import { AppError } from "@/utils/app-error";

export default class AuthService implements IAuthService {
  constructor(
    private userRepository: IUserRepository,
    private refreshTokenRepo: IRefreshTokenRepository
  ) {}

  register = async (email: string, name: string, password: string): Promise<void> => {
    const existingUser = await this.userRepository.findUserByEmail(email);

    if (existingUser) {
      throw new AppError("User Already Exists", 400);
    }

    const hashed = await hash(password, 10);

    const otp = Math.floor(1000 + Math.random() * 9000);

    const key = crypto.randomUUID();
    await redisClient.hSet(`register:${key}`, {
      email,
      name,
      hashed,
      otp: otp.toString(),
    });
    await redisClient.expire(`register:${key}`, 360);

    logger.debug(otp);
    logger.debug(key);
  };

  verifyOtp = async (otp: string, registerId: string): Promise<boolean> => {
    const key = `register:${registerId}`;

    const data = await redisClient.hGetAll(key);

    if (!data || Object.keys(data).length === 0) {
      throw new AppError("Registration data not found or OTP expired", 400);
    }

    if (data.otp !== otp) {
      throw new AppError("Invalid OTP", 400);
    }

    await this.userRepository.createUser({ email: data.email, password: data.hashed });
    await redisClient.del(key);

    // Call User Microservice and pass data {email, name}

    return true;
  };

  login = async (
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("User not found", 400);
    }

    const isPasswordMatch = compare(password, user.password);
    if (!isPasswordMatch) {
      throw new AppError("Invalid Password", 400);
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      config.access_token_secret,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, email: user.email },
      config.refresh_token_secret,
      { expiresIn: "7d" }
    );

    await this.refreshTokenRepo.createToken(refreshToken, user.id);

    return { accessToken, refreshToken };
  };
}
