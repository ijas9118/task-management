import cors from "cors";
import express, { Application, Request, Response } from "express";

import { config } from "./config/config";
import logger from "./config/logger";
import errorHandler from "./middlewares/error";
import authRouter from "./routes/auth-routes";

const app: Application = express();

app.use(express.json());

app.use(cors());

app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Auth-service is healthy", node: config.node_env });
});

app.use("/", authRouter);

app.use(errorHandler);

export default app;
