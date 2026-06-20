// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var Protos_user_pb = require('../Protos/user_pb.js');

function serialize_user_ChangeUserStateRequest(arg) {
  if (!(arg instanceof Protos_user_pb.ChangeUserStateRequest)) {
    throw new Error('Expected argument of type user.ChangeUserStateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_ChangeUserStateRequest(buffer_arg) {
  return Protos_user_pb.ChangeUserStateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_ChangeUserStateResponse(arg) {
  if (!(arg instanceof Protos_user_pb.ChangeUserStateResponse)) {
    throw new Error('Expected argument of type user.ChangeUserStateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_ChangeUserStateResponse(buffer_arg) {
  return Protos_user_pb.ChangeUserStateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_CreateUserRequest(arg) {
  if (!(arg instanceof Protos_user_pb.CreateUserRequest)) {
    throw new Error('Expected argument of type user.CreateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_CreateUserRequest(buffer_arg) {
  return Protos_user_pb.CreateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_CreateUserResponse(arg) {
  if (!(arg instanceof Protos_user_pb.CreateUserResponse)) {
    throw new Error('Expected argument of type user.CreateUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_CreateUserResponse(buffer_arg) {
  return Protos_user_pb.CreateUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetUsersRequest(arg) {
  if (!(arg instanceof Protos_user_pb.GetUsersRequest)) {
    throw new Error('Expected argument of type user.GetUsersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_GetUsersRequest(buffer_arg) {
  return Protos_user_pb.GetUsersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetUsersResponse(arg) {
  if (!(arg instanceof Protos_user_pb.GetUsersResponse)) {
    throw new Error('Expected argument of type user.GetUsersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_GetUsersResponse(buffer_arg) {
  return Protos_user_pb.GetUsersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_LoginRequest(arg) {
  if (!(arg instanceof Protos_user_pb.LoginRequest)) {
    throw new Error('Expected argument of type user.LoginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_LoginRequest(buffer_arg) {
  return Protos_user_pb.LoginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_LoginResponse(arg) {
  if (!(arg instanceof Protos_user_pb.LoginResponse)) {
    throw new Error('Expected argument of type user.LoginResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_LoginResponse(buffer_arg) {
  return Protos_user_pb.LoginResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UpdateUserRequest(arg) {
  if (!(arg instanceof Protos_user_pb.UpdateUserRequest)) {
    throw new Error('Expected argument of type user.UpdateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UpdateUserRequest(buffer_arg) {
  return Protos_user_pb.UpdateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UpdateUserResponse(arg) {
  if (!(arg instanceof Protos_user_pb.UpdateUserResponse)) {
    throw new Error('Expected argument of type user.UpdateUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UpdateUserResponse(buffer_arg) {
  return Protos_user_pb.UpdateUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserServicesService = exports.UserServicesService = {
  login: {
    path: '/user.UserServices/Login',
    requestStream: false,
    responseStream: false,
    requestType: Protos_user_pb.LoginRequest,
    responseType: Protos_user_pb.LoginResponse,
    requestSerialize: serialize_user_LoginRequest,
    requestDeserialize: deserialize_user_LoginRequest,
    responseSerialize: serialize_user_LoginResponse,
    responseDeserialize: deserialize_user_LoginResponse,
  },
  createUser: {
    path: '/user.UserServices/CreateUser',
    requestStream: false,
    responseStream: false,
    requestType: Protos_user_pb.CreateUserRequest,
    responseType: Protos_user_pb.CreateUserResponse,
    requestSerialize: serialize_user_CreateUserRequest,
    requestDeserialize: deserialize_user_CreateUserRequest,
    responseSerialize: serialize_user_CreateUserResponse,
    responseDeserialize: deserialize_user_CreateUserResponse,
  },
  updateUser: {
    path: '/user.UserServices/UpdateUser',
    requestStream: false,
    responseStream: false,
    requestType: Protos_user_pb.UpdateUserRequest,
    responseType: Protos_user_pb.UpdateUserResponse,
    requestSerialize: serialize_user_UpdateUserRequest,
    requestDeserialize: deserialize_user_UpdateUserRequest,
    responseSerialize: serialize_user_UpdateUserResponse,
    responseDeserialize: deserialize_user_UpdateUserResponse,
  },
  changeUserState: {
    path: '/user.UserServices/ChangeUserState',
    requestStream: false,
    responseStream: false,
    requestType: Protos_user_pb.ChangeUserStateRequest,
    responseType: Protos_user_pb.ChangeUserStateResponse,
    requestSerialize: serialize_user_ChangeUserStateRequest,
    requestDeserialize: deserialize_user_ChangeUserStateRequest,
    responseSerialize: serialize_user_ChangeUserStateResponse,
    responseDeserialize: deserialize_user_ChangeUserStateResponse,
  },
  getUsers: {
    path: '/user.UserServices/GetUsers',
    requestStream: false,
    responseStream: false,
    requestType: Protos_user_pb.GetUsersRequest,
    responseType: Protos_user_pb.GetUsersResponse,
    requestSerialize: serialize_user_GetUsersRequest,
    requestDeserialize: deserialize_user_GetUsersRequest,
    responseSerialize: serialize_user_GetUsersResponse,
    responseDeserialize: deserialize_user_GetUsersResponse,
  },
};

exports.UserServicesClient = grpc.makeGenericClientConstructor(UserServicesService, 'UserServices');
