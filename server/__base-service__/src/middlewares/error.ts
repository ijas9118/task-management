import type { NextFunction, Request, Response } from "express";

import type ErrorResponse from "@/types/error-response";

import { config } from "@/config/config";
import logger from "@/config/logger";

function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, _next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  if (config.node_env !== "production") {
    logger.error(err);
  }

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    ...(config.node_env !== "production" && { stack: err.stack }),
  });
}

export default errorHandler;
