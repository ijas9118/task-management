import path from "node:path";

import { loadPackageDefinition, Server, ServerCredentials } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

import { config } from "./config/config";
import logger from "./config/logger";
import { userController } from "./controllers/user.controller";
import { prismaClient } from "./lib/prisma";
import { ProtoGrpcType } from "./proto/user";
import UserRepository from "./repositories/user.repository";
import UserService from "./services/user.service";

const PROTO_PATH = path.join(__dirname, "./proto/user.proto");

const packageDef = loadSync(PROTO_PATH);
const grpcObj = loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;

const userRepo = new UserRepository(prismaClient);
const userService = new UserService(userRepo);
const controller = userController(userService);

const server = new Server();

server.addService(grpcObj.user.UserService.service, controller);

server.bindAsync(`0.0.0.0:${config.port}`, ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    logger.error("Bind failed:", err);
    return;
  }
  logger.info(`Server listening on port ${port}`);
});
