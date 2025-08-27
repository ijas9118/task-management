import cors from "cors";
import express, { Application, Request, Response } from "express";
import helmet from "helmet";

import logger from "./config/logger";
import errorHandler from "./middlewares/error";
import authRouter from "./routes/auth-routes";

const app: Application = express();

app.use(express.json());

app.use(helmet());
app.use(cors());

app.use((req, _res, next) => {
  logger.http(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Auth-service is healthy" });
});

app.use("/api/v1/", authRouter);

app.use((req, res) => {
  logger.warn(`Resource not found: ${req.method} ${req.url}`);
  res.status(400).json({ message: "Resource Not Found" });
});

app.use(errorHandler);

export default app;
