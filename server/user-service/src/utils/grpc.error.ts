import { status, ServiceError, Metadata } from "@grpc/grpc-js";

export class GrpcError extends Error implements ServiceError {
  code: status;
  details: string;
  metadata: Metadata;

  constructor(code: status, message: string, metadata?: Metadata) {
    super(message);
    this.code = code;
    this.details = message;
    this.metadata = metadata ?? new Metadata();
  }
}
