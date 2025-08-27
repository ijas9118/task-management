import grpc from "@grpc/grpc-js";

import { CreateUserRequest } from "@/proto/user/CreateUserRequest";
import { Empty } from "@/proto/user/Empty";
import { GetUserRequest } from "@/proto/user/GetUserRequest";
import { UpdateProfileRequest } from "@/proto/user/UpdateProfileRequest";
import { UserResponse } from "@/proto/user/UserResponse";
import { UsersResponse } from "@/proto/user/UsersResponse";
import { IUserService, UpdateUserInput } from "@/services/user.service.contract";
import { GrpcError } from "@/utils/grpc.error";
import { toGrpcError } from "@/utils/grpc.error.mapper";

export class UserController {
  constructor(private userService: IUserService) {}

  CreateUser = async (
    call: grpc.ServerUnaryCall<CreateUserRequest, UserResponse>,
    callback: grpc.sendUnaryData<UserResponse>
  ): Promise<void> => {
    try {
      const { id, email, name } = call.request;
      if (!id || !email || !name) {
        callback(new GrpcError(grpc.status.INVALID_ARGUMENT, "User details missing"));
        return;
      }

      const user = await this.userService.createUser({ id, email, name });
      callback(null, { id: user.id, email: user.email, name: user.name });
    } catch (err) {
      callback(toGrpcError(err), null);
    }
  };

  GetUser = async (
    call: grpc.ServerUnaryCall<GetUserRequest, UserResponse>,
    callback: grpc.sendUnaryData<UserResponse>
  ): Promise<void> => {
    try {
      if (!call.request.id) {
        callback(new GrpcError(grpc.status.INVALID_ARGUMENT, "User ID not found"));
        return;
      }
      const user = await this.userService.findById(call.request.id);
      if (!user) {
        callback(new GrpcError(grpc.status.NOT_FOUND, "User not found"));
        return;
      }
      callback(null, user);
    } catch (err) {
      callback(toGrpcError(err), null);
    }
  };

  GetAllUsers = async (
    _call: grpc.ServerUnaryCall<Empty, UsersResponse>,
    callback: grpc.sendUnaryData<UsersResponse>
  ): Promise<void> => {
    try {
      const users = await this.userService.findAll();
      callback(null, { users });
    } catch (err) {
      callback(toGrpcError(err), null);
    }
  };

  UpdateProfile = async (
    call: grpc.ServerUnaryCall<UpdateProfileRequest, UserResponse>,
    callback: grpc.sendUnaryData<UserResponse>
  ): Promise<void> => {
    const { id, name } = call.request;
    if (!id) {
      callback(new GrpcError(grpc.status.INVALID_ARGUMENT, "User ID not found"));
      return;
    }

    const updateData: UpdateUserInput = {};
    if (name) {
      updateData.name = name;
    }
    try {
      const user = await this.userService.update(id, updateData);
      callback(null, user);
    } catch (err) {
      callback(toGrpcError(err), null);
    }
  };
}
