import { status } from "@grpc/grpc-js";

import { GrpcError } from "./grpc.error";

import { UserAlreadyExistsError } from "@/errors/UserAlreadyExistsError";
import { UserNotFoundError } from "@/errors/UserNotFoundError";

export function toGrpcError(err: unknown): GrpcError {
  if (err instanceof UserNotFoundError) {
    return new GrpcError(status.NOT_FOUND, err.message);
  }
  if (err instanceof UserAlreadyExistsError) {
    return new GrpcError(status.ALREADY_EXISTS, err.message);
  }
  return new GrpcError(status.INTERNAL, (err as Error).message);
}
