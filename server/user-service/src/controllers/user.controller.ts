import { Request, Response } from "express";

import userServiceClient from "@/config/grpc.client";
import { asynHandler } from "@/utils/async-handler";

export class UserController {
  static getAllUsers = asynHandler(async (req: Request, res: Response) => {
    userServiceClient.GetAllUsers({}, (err, response) => {
      if (err) {
        res.status(500).json({ error: err.message });
      }
      res.json(response);
    });
  });

  static getUser = asynHandler(async (req: Request, res: Response) => {
    userServiceClient.GetUser({ id: req.params.id }, (err, response) => {
      if (err) {
        res.status(500).json({ error: err.message });
      }
      res.json(response);
    });
  });
}
