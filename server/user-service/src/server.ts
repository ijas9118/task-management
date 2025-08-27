import { ServerCredentials } from "@grpc/grpc-js";

import { config } from "./config/config";
import server from "./config/grpc.servet";
import logger from "./config/logger";

server.bindAsync(`0.0.0.0:${config.port}`, ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    logger.error("Bind failed:", err);
    return;
  }
  logger.info(`Server listening on port ${port}`);
});
