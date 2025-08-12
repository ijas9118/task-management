import { Router } from "express";

import AuthController from "@/controllers/auth.controller";
import { prismaClient } from "@/lib/prisma";
import RefreshTokenRepository from "@/repositories/refresh-token.repository";
import UserRepository from "@/repositories/user.repository";
import AuthService from "@/services/auth.service";

const authRouter = Router();

const userRepo = new UserRepository(prismaClient);
const refreshTokenRepo = new RefreshTokenRepository(prismaClient);
const authService = new AuthService(userRepo, refreshTokenRepo);
const authController = new AuthController(authService);

authRouter.post("/register", authController.register);

authRouter.post("/verify-otp", authController.verifyOtp);

authRouter.post("/login", authController.login);

export default authRouter;
