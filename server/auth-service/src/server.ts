import app from "./app";
import { config } from "./config/config";
import logger from "./config/logger";
import redisClient from "./config/redis";

(async (): Promise<void> => {
  try {
    await redisClient.connect();
    app.listen(config.port, () => {
      logger.info(`Auth-server running on http://localhost:${config.port}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
})();
