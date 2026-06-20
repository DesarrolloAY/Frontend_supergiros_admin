// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var Protos_Transaction_pb = require('../Protos/Transaction_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var Protos_Common_pb = require('../Protos/Common_pb.js');

function serialize_Protos_CancelTransactionRequest(arg) {
  if (!(arg instanceof Protos_Transaction_pb.CancelTransactionRequest)) {
    throw new Error('Expected argument of type Protos.CancelTransactionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_CancelTransactionRequest(buffer_arg) {
  return Protos_Transaction_pb.CancelTransactionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_CancelTransactionResponse(arg) {
  if (!(arg instanceof Protos_Transaction_pb.CancelTransactionResponse)) {
    throw new Error('Expected argument of type Protos.CancelTransactionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_CancelTransactionResponse(buffer_arg) {
  return Protos_Transaction_pb.CancelTransactionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_CreateTransactionRequest(arg) {
  if (!(arg instanceof Protos_Transaction_pb.CreateTransactionRequest)) {
    throw new Error('Expected argument of type Protos.CreateTransactionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_CreateTransactionRequest(buffer_arg) {
  return Protos_Transaction_pb.CreateTransactionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_CreateTransactionResponse(arg) {
  if (!(arg instanceof Protos_Transaction_pb.CreateTransactionResponse)) {
    throw new Error('Expected argument of type Protos.CreateTransactionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_CreateTransactionResponse(buffer_arg) {
  return Protos_Transaction_pb.CreateTransactionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_GetAllTransactionRequest(arg) {
  if (!(arg instanceof Protos_Transaction_pb.GetAllTransactionRequest)) {
    throw new Error('Expected argument of type Protos.GetAllTransactionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_GetAllTransactionRequest(buffer_arg) {
  return Protos_Transaction_pb.GetAllTransactionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_GetAllTransactionResponse(arg) {
  if (!(arg instanceof Protos_Transaction_pb.GetAllTransactionResponse)) {
    throw new Error('Expected argument of type Protos.GetAllTransactionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_GetAllTransactionResponse(buffer_arg) {
  return Protos_Transaction_pb.GetAllTransactionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_GetTransactionRequest(arg) {
  if (!(arg instanceof Protos_Transaction_pb.GetTransactionRequest)) {
    throw new Error('Expected argument of type Protos.GetTransactionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_GetTransactionRequest(buffer_arg) {
  return Protos_Transaction_pb.GetTransactionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_GetTransactionResponse(arg) {
  if (!(arg instanceof Protos_Transaction_pb.GetTransactionResponse)) {
    throw new Error('Expected argument of type Protos.GetTransactionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_GetTransactionResponse(buffer_arg) {
  return Protos_Transaction_pb.GetTransactionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_UpdateTransactionRequest(arg) {
  if (!(arg instanceof Protos_Transaction_pb.UpdateTransactionRequest)) {
    throw new Error('Expected argument of type Protos.UpdateTransactionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_UpdateTransactionRequest(buffer_arg) {
  return Protos_Transaction_pb.UpdateTransactionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_UpdateTransactionResponse(arg) {
  if (!(arg instanceof Protos_Transaction_pb.UpdateTransactionResponse)) {
    throw new Error('Expected argument of type Protos.UpdateTransactionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_UpdateTransactionResponse(buffer_arg) {
  return Protos_Transaction_pb.UpdateTransactionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var TransactionsService = exports.TransactionsService = {
  createTransaction: {
    path: '/Protos.Transactions/CreateTransaction',
    requestStream: false,
    responseStream: false,
    requestType: Protos_Transaction_pb.CreateTransactionRequest,
    responseType: Protos_Transaction_pb.CreateTransactionResponse,
    requestSerialize: serialize_Protos_CreateTransactionRequest,
    requestDeserialize: deserialize_Protos_CreateTransactionRequest,
    responseSerialize: serialize_Protos_CreateTransactionResponse,
    responseDeserialize: deserialize_Protos_CreateTransactionResponse,
  },
  updateTransaction: {
    path: '/Protos.Transactions/UpdateTransaction',
    requestStream: false,
    responseStream: false,
    requestType: Protos_Transaction_pb.UpdateTransactionRequest,
    responseType: Protos_Transaction_pb.UpdateTransactionResponse,
    requestSerialize: serialize_Protos_UpdateTransactionRequest,
    requestDeserialize: deserialize_Protos_UpdateTransactionRequest,
    responseSerialize: serialize_Protos_UpdateTransactionResponse,
    responseDeserialize: deserialize_Protos_UpdateTransactionResponse,
  },
  cancelTransaction: {
    path: '/Protos.Transactions/CancelTransaction',
    requestStream: false,
    responseStream: false,
    requestType: Protos_Transaction_pb.CancelTransactionRequest,
    responseType: Protos_Transaction_pb.CancelTransactionResponse,
    requestSerialize: serialize_Protos_CancelTransactionRequest,
    requestDeserialize: deserialize_Protos_CancelTransactionRequest,
    responseSerialize: serialize_Protos_CancelTransactionResponse,
    responseDeserialize: deserialize_Protos_CancelTransactionResponse,
  },
  getTransaction: {
    path: '/Protos.Transactions/GetTransaction',
    requestStream: false,
    responseStream: false,
    requestType: Protos_Transaction_pb.GetTransactionRequest,
    responseType: Protos_Transaction_pb.GetTransactionResponse,
    requestSerialize: serialize_Protos_GetTransactionRequest,
    requestDeserialize: deserialize_Protos_GetTransactionRequest,
    responseSerialize: serialize_Protos_GetTransactionResponse,
    responseDeserialize: deserialize_Protos_GetTransactionResponse,
  },
  getAllTransaction: {
    path: '/Protos.Transactions/GetAllTransaction',
    requestStream: false,
    responseStream: false,
    requestType: Protos_Transaction_pb.GetAllTransactionRequest,
    responseType: Protos_Transaction_pb.GetAllTransactionResponse,
    requestSerialize: serialize_Protos_GetAllTransactionRequest,
    requestDeserialize: deserialize_Protos_GetAllTransactionRequest,
    responseSerialize: serialize_Protos_GetAllTransactionResponse,
    responseDeserialize: deserialize_Protos_GetAllTransactionResponse,
  },
};

exports.TransactionsClient = grpc.makeGenericClientConstructor(TransactionsService, 'Transactions');
