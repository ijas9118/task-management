import { ErrorRequestHandler } from "express";

import { config } from "@/config/config";
import logger from "@/config/logger";

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;

  if (config.node_env !== "production") {
    logger.error(err);
  }

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    ...(config.node_env !== "production" && { stack: err.stack }),
  });
};

export default errorHandler;
