import { status } from "@grpc/grpc-js";

import { UserServiceHandlers } from "@/proto/user/UserService";
import { IUserService, UpdateUserInput } from "@/services/user.service.contract";
import { GrpcError } from "@/utils/grpc.error";
import { toGrpcError } from "@/utils/grpc.error.mapper";

export function userController(userService: IUserService): UserServiceHandlers {
  return {
    CreateUser: async (call, callback) => {
      try {
        const { id, email, name } = call.request;
        const user = await userService.createUser({ id, email, name });
        callback(null, { id: user.id, email: user.email, name: user.name });
      } catch (err) {
        callback(toGrpcError(err), null);
      }
    },

    GetUser: async (call, callback) => {
      try {
        const user = await userService.findById(call.request.id);
        if (!user) {
          callback(new GrpcError(status.NOT_FOUND, "User not found"));
          return;
        }
        callback(null, user);
      } catch (error) {
        callback(
          error instanceof GrpcError
            ? error
            : new GrpcError(status.INTERNAL, (error as Error).message),
          null
        );
      }
      return;
    },

    GetAllUsers: (_call, callback) => {
      userService
        .findAll()
        .then((users) => callback(null, { users }))
        .catch((err) =>
          callback(
            err instanceof GrpcError ? err : new GrpcError(status.INTERNAL, (err as Error).message),
            null
          )
        );
    },

    UpdateProfile: (call, callback) => {
      const { id, name } = call.request;

      const updateData: UpdateUserInput = {};
      if (name) {
        updateData.name = name;
      }

      userService
        .update(id, updateData)
        .then((user) => callback(null, user))
        .catch((err) =>
          callback(
            err instanceof GrpcError ? err : new GrpcError(status.INTERNAL, (err as Error).message),
            null
          )
        );
    },
  } as UserServiceHandlers;
}
