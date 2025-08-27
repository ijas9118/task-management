import path from "node:path";

import { loadPackageDefinition, Server } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

import { UserController } from "@/controllers/user.controller";
import { prismaClient } from "@/lib/prisma";
import { ProtoGrpcType } from "@/proto/user";
import UserRepository from "@/repositories/user.repository";
import UserService from "@/services/user.service";

const PROTO_PATH = path.join(__dirname, "../proto/user.proto");

const packageDef = loadSync(PROTO_PATH);
const grpcObj = loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;

const userRepo = new UserRepository(prismaClient);
const userService = new UserService(userRepo);
const controller = new UserController(userService);

const server = new Server();

server.addService(grpcObj.user.UserService.service, {
  CreateUser: controller.CreateUser,
  GetUser: controller.GetUser,
  GetAllUsers: controller.GetAllUsers,
  UpdateProfile: controller.UpdateProfile,
});

export default server;
