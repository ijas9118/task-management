import { Request, Response } from "express";

import { IAuthService } from "@/services/IAuthService";
import { asynHandler } from "@/utils/async-handler";

export default class AuthController {
  constructor(private authService: IAuthService) {}

  register = asynHandler(async (req: Request, res: Response) => {
    const { email, name, password } = req.body;

    const result = await this.authService.register(email, name, password);

    res.status(201).json(result);
  });
}
