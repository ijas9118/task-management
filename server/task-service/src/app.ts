import cors from "cors";
import express from "express";
import helmet from "helmet";
import { StatusCodes } from "http-status-codes";

import type MessageResponse from "./types/message-response";

import logger from "./config/logger";
import errorHandler from "./middlewares/error";
import notFoundHandler from "./middlewares/not-found";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use((req, _res, next) => {
  logger.http(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get<object, MessageResponse>("/api/v1/health", (_req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Task Service is healthy",
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
