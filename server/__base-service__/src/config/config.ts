import dotenv from "dotenv";
import { z } from "zod";

import pkg from "../../package.json";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().min(1, "Port is required").default("3000"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  LOG_LEVEL: z
    .enum(["error", "warn", "info", "http", "verbose", "debug", "silly"])
    .default("http"),
  SERVICE_NAME: z.string().default(pkg.name),
});

// eslint-disable-next-line node/no-process-env
const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("❌ Invalid environment variables:", env.error);
  // eslint-disable-next-line node/no-process-env
  if (process.env.NODE_ENV !== "test") {
    process.exit(1);
  }
  else {
    throw new Error(`Invalid environment variables: ${JSON.stringify(env.error.format())}`);
  }
}

export const config = {
  port: env.data.PORT,
  node_env: env.data.NODE_ENV,
  log_level: env.data.LOG_LEVEL,
  service_name: env.data.SERVICE_NAME,
};
