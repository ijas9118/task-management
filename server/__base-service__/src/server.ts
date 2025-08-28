import app from "./app";
import { config } from "./config/config";
import logger from "./config/logger";

(async (): Promise<void> => {
  try {
    app.listen(config.port, () => {
      logger.info(
        `${config.service_name} running on http://localhost:${config.port}`,
      );
    });
  }
  catch (error) {
    logger.error(error);
    process.exit(1);
  }
})();
