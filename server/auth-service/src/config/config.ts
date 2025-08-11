import dotenv from "dotenv";
import { z } from "zod";

import logger from "./logger";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  REDIS_URL: z.string().min(1, "Redis URL is required"),
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
};
