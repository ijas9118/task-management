import dotenv from "dotenv";
import { z } from "zod";

import logger from "./logger";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  REDIS_URL: z.string().min(1, "Redis URL is required"),
  ACCESS_TOKEN_SECRET: z.string().min(1, "Access Token secret is required"),
  REFRESH_TOKEN_SECRET: z.string().min(1, "Refresh Token secret is required"),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  logger.error("❌ Invalid environment variables:", env.error);
  process.exit(1);
}

export const config = {
  port: parseInt(env.data.PORT || "3000"),
  node_env: env.data.NODE_ENV,
  redis_url: env.data.REDIS_URL,
  access_token_secret: env.data.ACCESS_TOKEN_SECRET,
  refresh_token_secret: env.data.REFRESH_TOKEN_SECRET,
};
