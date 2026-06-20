// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var Protos_Customer_pb = require('../Protos/Customer_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var Protos_Common_pb = require('../Protos/Common_pb.js');

function serialize_Protos_CancelCustomerRequest(arg) {
  if (!(arg instanceof Protos_Customer_pb.CancelCustomerRequest)) {
    throw new Error('Expected argument of type Protos.CancelCustomerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_CancelCustomerRequest(buffer_arg) {
  return Protos_Customer_pb.CancelCustomerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_CancelCustomerResponse(arg) {
  if (!(arg instanceof Protos_Customer_pb.CancelCustomerResponse)) {
    throw new Error('Expected argument of type Protos.CancelCustomerResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_CancelCustomerResponse(buffer_arg) {
  return Protos_Customer_pb.CancelCustomerResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_CreateCustomerRequest(arg) {
  if (!(arg instanceof Protos_Customer_pb.CreateCustomerRequest)) {
    throw new Error('Expected argument of type Protos.CreateCustomerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_CreateCustomerRequest(buffer_arg) {
  return Protos_Customer_pb.CreateCustomerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_CreateCustomerResponse(arg) {
  if (!(arg instanceof Protos_Customer_pb.CreateCustomerResponse)) {
    throw new Error('Expected argument of type Protos.CreateCustomerResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_CreateCustomerResponse(buffer_arg) {
  return Protos_Customer_pb.CreateCustomerResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_GetAllCustomerRequest(arg) {
  if (!(arg instanceof Protos_Customer_pb.GetAllCustomerRequest)) {
    throw new Error('Expected argument of type Protos.GetAllCustomerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_GetAllCustomerRequest(buffer_arg) {
  return Protos_Customer_pb.GetAllCustomerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_GetAllCustomerResponse(arg) {
  if (!(arg instanceof Protos_Customer_pb.GetAllCustomerResponse)) {
    throw new Error('Expected argument of type Protos.GetAllCustomerResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_GetAllCustomerResponse(buffer_arg) {
  return Protos_Customer_pb.GetAllCustomerResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_GetCustomerByDniRequest(arg) {
  if (!(arg instanceof Protos_Customer_pb.GetCustomerByDniRequest)) {
    throw new Error('Expected argument of type Protos.GetCustomerByDniRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_GetCustomerByDniRequest(buffer_arg) {
  return Protos_Customer_pb.GetCustomerByDniRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_GetCustomerRequest(arg) {
  if (!(arg instanceof Protos_Customer_pb.GetCustomerRequest)) {
    throw new Error('Expected argument of type Protos.GetCustomerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_GetCustomerRequest(buffer_arg) {
  return Protos_Customer_pb.GetCustomerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_GetCustomerResponse(arg) {
  if (!(arg instanceof Protos_Customer_pb.GetCustomerResponse)) {
    throw new Error('Expected argument of type Protos.GetCustomerResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_GetCustomerResponse(buffer_arg) {
  return Protos_Customer_pb.GetCustomerResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_UpdateCustomerRequest(arg) {
  if (!(arg instanceof Protos_Customer_pb.UpdateCustomerRequest)) {
    throw new Error('Expected argument of type Protos.UpdateCustomerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_UpdateCustomerRequest(buffer_arg) {
  return Protos_Customer_pb.UpdateCustomerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Protos_UpdateCustomerResponse(arg) {
  if (!(arg instanceof Protos_Customer_pb.UpdateCustomerResponse)) {
    throw new Error('Expected argument of type Protos.UpdateCustomerResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Protos_UpdateCustomerResponse(buffer_arg) {
  return Protos_Customer_pb.UpdateCustomerResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CustomersService = exports.CustomersService = {
  createCustomer: {
    path: '/Protos.Customers/CreateCustomer',
    requestStream: false,
    responseStream: false,
    requestType: Protos_Customer_pb.CreateCustomerRequest,
    responseType: Protos_Customer_pb.CreateCustomerResponse,
    requestSerialize: serialize_Protos_CreateCustomerRequest,
    requestDeserialize: deserialize_Protos_CreateCustomerRequest,
    responseSerialize: serialize_Protos_CreateCustomerResponse,
    responseDeserialize: deserialize_Protos_CreateCustomerResponse,
  },
  updateCustomer: {
    path: '/Protos.Customers/UpdateCustomer',
    requestStream: false,
    responseStream: false,
    requestType: Protos_Customer_pb.UpdateCustomerRequest,
    responseType: Protos_Customer_pb.UpdateCustomerResponse,
    requestSerialize: serialize_Protos_UpdateCustomerRequest,
    requestDeserialize: deserialize_Protos_UpdateCustomerRequest,
    responseSerialize: serialize_Protos_UpdateCustomerResponse,
    responseDeserialize: deserialize_Protos_UpdateCustomerResponse,
  },
  cancelCustomer: {
    path: '/Protos.Customers/CancelCustomer',
    requestStream: false,
    responseStream: false,
    requestType: Protos_Customer_pb.CancelCustomerRequest,
    responseType: Protos_Customer_pb.CancelCustomerResponse,
    requestSerialize: serialize_Protos_CancelCustomerRequest,
    requestDeserialize: deserialize_Protos_CancelCustomerRequest,
    responseSerialize: serialize_Protos_CancelCustomerResponse,
    responseDeserialize: deserialize_Protos_CancelCustomerResponse,
  },
  getCustomer: {
    path: '/Protos.Customers/GetCustomer',
    requestStream: false,
    responseStream: false,
    requestType: Protos_Customer_pb.GetCustomerRequest,
    responseType: Protos_Customer_pb.GetCustomerResponse,
    requestSerialize: serialize_Protos_GetCustomerRequest,
    requestDeserialize: deserialize_Protos_GetCustomerRequest,
    responseSerialize: serialize_Protos_GetCustomerResponse,
    responseDeserialize: deserialize_Protos_GetCustomerResponse,
  },
  getAllCustomer: {
    path: '/Protos.Customers/GetAllCustomer',
    requestStream: false,
    responseStream: false,
    requestType: Protos_Customer_pb.GetAllCustomerRequest,
    responseType: Protos_Customer_pb.GetAllCustomerResponse,
    requestSerialize: serialize_Protos_GetAllCustomerRequest,
    requestDeserialize: deserialize_Protos_GetAllCustomerRequest,
    responseSerialize: serialize_Protos_GetAllCustomerResponse,
    responseDeserialize: deserialize_Protos_GetAllCustomerResponse,
  },
  // 🚀 NUEVA RUTA DE VENTANILLA: Busca explícitamente usando el parámetro NroDocumento (DNI)
getCustomerByDni: {
    path: '/Protos.Customers/GetCustomerByDni',
    requestStream: false,
    responseStream: false,
    requestType: Protos_Customer_pb.GetCustomerByDniRequest,
    responseType: Protos_Customer_pb.GetCustomerResponse,
    requestSerialize: serialize_Protos_GetCustomerByDniRequest,
    requestDeserialize: deserialize_Protos_GetCustomerByDniRequest,
    responseSerialize: serialize_Protos_GetCustomerResponse,
    responseDeserialize: deserialize_Protos_GetCustomerResponse,
  },
};

exports.CustomersClient = grpc.makeGenericClientConstructor(CustomersService, 'Customers');
