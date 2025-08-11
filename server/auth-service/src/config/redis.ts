import { createClient } from "redis";

import { config } from "./config";
import logger from "./logger";

const redisClient = createClient({
  url: config.redis_url,
});

redisClient.on("connect", () => logger.info("Connected to Redis"));

redisClient.on("error", (err) => logger.error("Redis Client Error", err));

export default redisClient;
