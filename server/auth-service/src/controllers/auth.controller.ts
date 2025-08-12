import { Request, Response } from "express";

import { config } from "@/config/config";
import { IAuthService } from "@/services/interfaces/IAuthService";
import { asynHandler } from "@/utils/async-handler";

export default class AuthController {
  constructor(private authService: IAuthService) {}

  register = asynHandler(async (req: Request, res: Response) => {
    const { email, name, password } = req.body;

    await this.authService.register(email, name, password);

    res.status(201).json({ message: "OTP sent your email" });
  });

  verifyOtp = asynHandler(async (req: Request, res: Response) => {
    const { otp, registerId } = req.body;

    const result = await this.authService.verifyOtp(otp, registerId);

    if (!result) {
      res.status(401).json({ success: false, message: "OTP validation failed" });
    }

    res.status(200).json({ success: true, message: "OTP verified" });
  });

  login = asynHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await this.authService.login(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: config.node_env === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    });

    res.status(200).json({ success: true, data: { accessToken } });
  });
}
