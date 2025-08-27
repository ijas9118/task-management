import cors from "cors";
import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import { StatusCodes } from "http-status-codes";

import { config } from "./config/config";
import logger from "./config/logger";
import { proxyServices } from "./config/services";
import errorHandler from "./middlewares/error";
import { apiLimiter } from "./middlewares/rate-limitter.middleware";

const app: Application = express();

app.use(express.json());

app.use(helmet());
app.use(cors());
app.use(apiLimiter);

app.use((req, _res, next) => {
  logger.http(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get("/health", (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    message: "API-Gateway is healthy",
    node: config.node_env,
    service_name: config.service_name,
  });
});

proxyServices(app);

app.use((req, res) => {
  logger.warn(`Resource not found: ${req.method} ${req.url}`);
  res.status(StatusCodes.BAD_REQUEST).json({ message: "Resource Not Found" });
});

app.use(errorHandler);

export default app;
