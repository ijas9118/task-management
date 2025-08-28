import path from "node:path";

import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

import { config } from "./config";

import { ProtoGrpcType } from "@/proto/user";

const PROTO_PATH = path.join(__dirname, "../proto/user.proto");

const packageDef = loadSync(PROTO_PATH);
const grpcObj = loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;

const userServiceClient = new grpcObj.user.UserService(
  `0.0.0.0:${config.grpc_port}`,
  credentials.createInsecure()
);

export default userServiceClient;
