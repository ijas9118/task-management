import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/user";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Recreate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.resolve(__dirname, "../proto/user.proto");
console.log("Loading proto from:", PROTO_PATH);

const packageDefinition = loadSync(PROTO_PATH);
const proto = loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;

export const userServiceClient = new proto.user.UserService(
  "user-service:3002",
  credentials.createInsecure()
);
