import mongoose from "mongoose";

import { config } from "./config";
import logger from "./logger";

export async function connectToDB(): Promise<void> {
  try {
    await mongoose.connect(config.mongo_uri);
    logger.info("Connected to MongoDB successfully");
  }
  catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
