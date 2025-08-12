import cors from "cors";
import express, { Application, Request, Response } from "express";

const app: Application = express();

app.use(express.json());

app.use(cors());

app.get("/health", (_req: Request, res: Response) =>
  res.status(200).json({ message: "Task-Service is Healthy" })
);

export default app;
