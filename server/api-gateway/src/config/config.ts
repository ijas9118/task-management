import dotenv from "dotenv";
import { z } from "zod";

import pkg from "../../package.json";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().min(1, "Port is required").default("3002"),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  LOG_LEVEL: z.enum(["error", "warn", "info", "http", "verbose", "debug", "silly"]).default("info"),
  SERVICE_NAME: z.string().default(pkg.name),
  REDIS_URL: z.string().min(1, "Redis URL is required").default("redis://redis-stack:6379"),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  // eslint-disable-next-line no-console
  console.error("❌ Invalid environment variables:", env.error);
  process.exit(1);
}

export const config = {
  port: env.data.PORT,
  node_env: env.data.NODE_ENV,
  log_level: env.data.LOG_LEVEL,
  service_name: env.data.SERVICE_NAME,
  redis_url: env.data.REDIS_URL,
};
