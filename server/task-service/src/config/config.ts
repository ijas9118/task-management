/* eslint-disable node/no-process-env */
import dotenv from "dotenv";
import { z } from "zod";

import pkg from "../../package.json";

dotenv.config();

const nodeEnv = process.env.NODE_ENV || "development";

let envData;

if (nodeEnv === "test") {
  envData = {
    PORT: process.env.PORT || "3000",
    NODE_ENV: "test",
    LOG_LEVEL: process.env.LOG_LEVEL || "http",
    SERVICE_NAME: pkg.name,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/testdb",
  };
}
else {
  const envSchema = z.object({
    PORT: z.string().min(1, "Port is required").default("3000"),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    LOG_LEVEL: z
      .enum(["error", "warn", "info", "http", "verbose", "debug", "silly"])
      .default("http"),
    SERVICE_NAME: z.string().default(pkg.name),
    MONGO_URI: z.string().min(1, "Must be a valid MongoDB connection string"),
  });

  const env = envSchema.safeParse(process.env);

  if (!env.success) {
    console.error("❌ Invalid environment variables:", env.error);
    process.exit(1);
  }
  envData = env.data;
}

export const config = {
  port: envData.PORT,
  node_env: envData.NODE_ENV,
  log_level: envData.LOG_LEVEL,
  service_name: envData.SERVICE_NAME,
  mongo_uri: envData.MONGO_URI,
};
