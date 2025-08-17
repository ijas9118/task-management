import type { CreateUserRequest as _user_CreateUserRequest, CreateUserRequest__Output as _user_CreateUserRequest__Output } from './user/CreateUserRequest';
import type { Empty as _user_Empty, Empty__Output as _user_Empty__Output } from './user/Empty';
import type { GetUserRequest as _user_GetUserRequest, GetUserRequest__Output as _user_GetUserRequest__Output } from './user/GetUserRequest';
import type { UpdateProfileRequest as _user_UpdateProfileRequest, UpdateProfileRequest__Output as _user_UpdateProfileRequest__Output } from './user/UpdateProfileRequest';
import type { UserResponse as _user_UserResponse, UserResponse__Output as _user_UserResponse__Output } from './user/UserResponse';
import type { UserServiceClient as _user_UserServiceClient, UserServiceDefinition as _user_UserServiceDefinition } from './user/UserService';
import type { UsersResponse as _user_UsersResponse, UsersResponse__Output as _user_UsersResponse__Output } from './user/UsersResponse';
import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  user: {
    CreateUserRequest: MessageTypeDefinition<_user_CreateUserRequest, _user_CreateUserRequest__Output>
    Empty: MessageTypeDefinition<_user_Empty, _user_Empty__Output>
    GetUserRequest: MessageTypeDefinition<_user_GetUserRequest, _user_GetUserRequest__Output>
    UpdateProfileRequest: MessageTypeDefinition<_user_UpdateProfileRequest, _user_UpdateProfileRequest__Output>
    UserResponse: MessageTypeDefinition<_user_UserResponse, _user_UserResponse__Output>
    UserService: SubtypeConstructor<typeof grpc.Client, _user_UserServiceClient> & { service: _user_UserServiceDefinition }
    UsersResponse: MessageTypeDefinition<_user_UsersResponse, _user_UsersResponse__Output>
  }
}

