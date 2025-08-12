import { Refresh_Tokens } from "@prisma/client";

export interface IRefreshTokenRepository {
  createToken(refreshToken: string, userId: string): Promise<Refresh_Tokens>;
}
