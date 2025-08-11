import { Router } from "express";

import AuthController from "@/controllers/auth.controller";
import { prismaClient } from "@/lib/prisma";
import UserRepository from "@/repositories/user.repository";
import AuthService from "@/services/auth.service";

const authRouter = Router();

const userService = new UserRepository(prismaClient);
const authService = new AuthService(userService);
const authController = new AuthController(authService);

authRouter.post("/register", authController.register);

export default authRouter;
