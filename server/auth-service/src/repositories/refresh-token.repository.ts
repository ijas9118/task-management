import { PrismaClient, Refresh_Tokens } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";

import { IRefreshTokenRepository } from "./interfaces/IRefreshTokenRepository";

import { AppError } from "@/utils/app-error";

export default class RefreshTokenRepository implements IRefreshTokenRepository {
  constructor(private prisma: PrismaClient) {}

  createToken = async (refreshToken: string, userId: string): Promise<Refresh_Tokens> => {
    const decoded = jwt.decode(refreshToken) as JwtPayload;

    if (!decoded || !decoded.exp || !decoded.iat) {
      throw new AppError("Inavlid refresh token payload", 500);
    }

    const issuedAt = new Date(decoded.iat * 1000);
    const expiresAt = new Date(decoded.exp * 1000);

    return await this.prisma.refresh_Tokens.create({
      data: {
        token: refreshToken,
        expiresAt,
        issuedAt,
        userId,
        revoked: false,
      },
    });
  };
}
