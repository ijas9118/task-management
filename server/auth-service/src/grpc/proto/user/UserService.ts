// Original file: src/proto/user.proto

import type { CreateUserRequest as _user_CreateUserRequest, CreateUserRequest__Output as _user_CreateUserRequest__Output } from '../user/CreateUserRequest';
import type { Empty as _user_Empty, Empty__Output as _user_Empty__Output } from '../user/Empty';
import type { GetUserRequest as _user_GetUserRequest, GetUserRequest__Output as _user_GetUserRequest__Output } from '../user/GetUserRequest';
import type { UpdateProfileRequest as _user_UpdateProfileRequest, UpdateProfileRequest__Output as _user_UpdateProfileRequest__Output } from '../user/UpdateProfileRequest';
import type { UserResponse as _user_UserResponse, UserResponse__Output as _user_UserResponse__Output } from '../user/UserResponse';
import type { UsersResponse as _user_UsersResponse, UsersResponse__Output as _user_UsersResponse__Output } from '../user/UsersResponse';
import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';

export interface UserServiceClient extends grpc.Client {
  CreateUser(argument: _user_CreateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _user_CreateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _user_CreateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _user_CreateUserRequest, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _user_CreateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _user_CreateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _user_CreateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _user_CreateUserRequest, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  
  GetAllUsers(argument: _user_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UsersResponse__Output>): grpc.ClientUnaryCall;
  GetAllUsers(argument: _user_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UsersResponse__Output>): grpc.ClientUnaryCall;
  GetAllUsers(argument: _user_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UsersResponse__Output>): grpc.ClientUnaryCall;
  GetAllUsers(argument: _user_Empty, callback: grpc.requestCallback<_user_UsersResponse__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _user_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UsersResponse__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _user_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UsersResponse__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _user_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UsersResponse__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _user_Empty, callback: grpc.requestCallback<_user_UsersResponse__Output>): grpc.ClientUnaryCall;
  
  GetUser(argument: _user_GetUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _user_GetUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _user_GetUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  GetUser(argument: _user_GetUserRequest, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _user_GetUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _user_GetUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _user_GetUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  getUser(argument: _user_GetUserRequest, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  
  UpdateProfile(argument: _user_UpdateProfileRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  UpdateProfile(argument: _user_UpdateProfileRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  UpdateProfile(argument: _user_UpdateProfileRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  UpdateProfile(argument: _user_UpdateProfileRequest, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  updateProfile(argument: _user_UpdateProfileRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  updateProfile(argument: _user_UpdateProfileRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  updateProfile(argument: _user_UpdateProfileRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  updateProfile(argument: _user_UpdateProfileRequest, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateUser: grpc.handleUnaryCall<_user_CreateUserRequest__Output, _user_UserResponse>;
  
  GetAllUsers: grpc.handleUnaryCall<_user_Empty__Output, _user_UsersResponse>;
  
  GetUser: grpc.handleUnaryCall<_user_GetUserRequest__Output, _user_UserResponse>;
  
  UpdateProfile: grpc.handleUnaryCall<_user_UpdateProfileRequest__Output, _user_UserResponse>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  CreateUser: MethodDefinition<_user_CreateUserRequest, _user_UserResponse, _user_CreateUserRequest__Output, _user_UserResponse__Output>
  GetAllUsers: MethodDefinition<_user_Empty, _user_UsersResponse, _user_Empty__Output, _user_UsersResponse__Output>
  GetUser: MethodDefinition<_user_GetUserRequest, _user_UserResponse, _user_GetUserRequest__Output, _user_UserResponse__Output>
  UpdateProfile: MethodDefinition<_user_UpdateProfileRequest, _user_UserResponse, _user_UpdateProfileRequest__Output, _user_UserResponse__Output>
}
