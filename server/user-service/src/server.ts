import { ServerCredentials } from "@grpc/grpc-js";

import app from "./app";
import { config } from "./config/config";
import server from "./config/grpc.server";
import logger from "./config/logger";

app.listen(config.port, () =>
  logger.info(`User Service running at http://localhost:${config.port}`)
);

server.bindAsync(`0.0.0.0:${config.grpc_port}`, ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    logger.error("Bind failed:", err);
    return;
  }
  logger.info(`User gRPC Server listening on port ${port}`);
});
