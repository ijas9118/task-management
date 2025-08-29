import dotenv from "dotenv";
import { z } from "zod";

import pkg from "../../package.json";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().min(1, "Port is required").default("3002"),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  DEFAULT_TIMEOUT: z.string().default("30000"),
  LOG_LEVEL: z.enum(["error", "warn", "info", "http", "verbose", "debug", "silly"]).default("info"),
  SERVICE_NAME: z.string().default(pkg.name),
  REDIS_URL: z.string().min(1, "Redis URL is required"),
  AUTH_SERVICE_URL: z.string().min(1, "Auth service url required"),
  USER_SERVICE_URL: z.string().min(1, "User service url required"),
  TASK_SERVICE_URL: z.string().min(1, "Task service url required"),
  PROJECT_SERVICE_URL: z.string().min(1, "Project service url required"),
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
  auth_service_url: env.data.AUTH_SERVICE_URL,
  user_service_url: env.data.USER_SERVICE_URL,
  task_service_url: env.data.TASK_SERVICE_URL,
  project_service_url: env.data.PROJECT_SERVICE_URL,
  default_timeout: parseInt(env.data.DEFAULT_TIMEOUT, 10),
};
