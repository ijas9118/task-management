import dotenv from "dotenv";
import { z } from "zod";

import logger from "./logger";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().min(1, "Port is required").default("3002"),
  GRPC_PORT: z.string().min(1, "gRPC Port is required").default("5002"),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  logger.error("❌ Invalid environment variables:", env.error);
  process.exit(1);
}

export const config = {
  port: env.data.PORT,
  node_env: env.data.NODE_ENV,
  grpc_port: env.data.GRPC_PORT,
};
