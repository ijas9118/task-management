import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import { StatusCodes } from "http-status-codes";

import logger from "./config/logger";
import errorHandler from "./middlewares/error";

import userRoutes from "@/routes/user.routes";

const app: Application = express();

app.use(express.json());
app.use(helmet());

app.use((req, _res, next) => {
  logger.http(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ message: "User-service is healthy" });
});

app.use("/api/v1/", userRoutes);

app.use((req, res) => {
  logger.warn(`Resource not found: ${req.method} ${req.url}`);
  res.status(StatusCodes.BAD_REQUEST).json({ message: "Resource Not Found" });
});

app.use(errorHandler);

export default app;
