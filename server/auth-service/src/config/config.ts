import dotenv from "dotenv";
import { z } from "zod";

import pkg from "../../package.json";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  REDIS_URL: z.string().min(1, "Redis URL is required"),
  LOG_LEVEL: z.enum(["error", "warn", "info", "http", "verbose", "debug", "silly"]).default("info"),
  ACCESS_TOKEN_SECRET: z.string().min(1, "Access Token secret is required"),
  REFRESH_TOKEN_SECRET: z.string().min(1, "Refresh Token secret is required"),
  SERVICE_NAME: z.string().default(pkg.name),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  // eslint-disable-next-line no-console
  console.error("❌ Invalid environment variables:", env.error);
  process.exit(1);
}

export const config = {
  port: parseInt(env.data.PORT || "3000"),
  node_env: env.data.NODE_ENV,
  redis_url: env.data.REDIS_URL,
  access_token_secret: env.data.ACCESS_TOKEN_SECRET,
  refresh_token_secret: env.data.REFRESH_TOKEN_SECRET,
  service_name: env.data.SERVICE_NAME,
  log_level: env.data.LOG_LEVEL,
};
