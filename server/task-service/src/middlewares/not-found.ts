import type { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

import logger from "@/config/logger";

function notFoundHandler(req: Request, res: Response, _next: NextFunction) {
  logger.warn(`Resource not found: ${req.method} ${req.url}`);
  res.status(StatusCodes.NOT_FOUND).json({ message: "Resource Not Found" });
}

export default notFoundHandler;
