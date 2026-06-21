// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var Protos_Office_pb = require('../Protos/Office_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var Protos_Common_pb = require('../Protos/Common_pb.js');

function serialize_CancelOfficeRequest(arg) {
  if (!(arg instanceof Protos_Office_pb.CancelOfficeRequest)) {
    throw new Error('Expected argument of type CancelOfficeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CancelOfficeRequest(buffer_arg) {
  return Protos_Office_pb.CancelOfficeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CancelOfficeResponse(arg) {
  if (!(arg instanceof Protos_Office_pb.CancelOfficeResponse)) {
    throw new Error('Expected argument of type CancelOfficeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CancelOfficeResponse(buffer_arg) {
  return Protos_Office_pb.CancelOfficeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CreateOfficeRequest(arg) {
  if (!(arg instanceof Protos_Office_pb.CreateOfficeRequest)) {
    throw new Error('Expected argument of type CreateOfficeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CreateOfficeRequest(buffer_arg) {
  return Protos_Office_pb.CreateOfficeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CreateOfficeResponse(arg) {
  if (!(arg instanceof Protos_Office_pb.CreateOfficeResponse)) {
    throw new Error('Expected argument of type CreateOfficeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CreateOfficeResponse(buffer_arg) {
  return Protos_Office_pb.CreateOfficeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetAllOfficeRequest(arg) {
  if (!(arg instanceof Protos_Office_pb.GetAllOfficeRequest)) {
    throw new Error('Expected argument of type GetAllOfficeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetAllOfficeRequest(buffer_arg) {
  return Protos_Office_pb.GetAllOfficeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetAllOfficeResponse(arg) {
  if (!(arg instanceof Protos_Office_pb.GetAllOfficeResponse)) {
    throw new Error('Expected argument of type GetAllOfficeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetAllOfficeResponse(buffer_arg) {
  return Protos_Office_pb.GetAllOfficeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetOfficeRequest(arg) {
  if (!(arg instanceof Protos_Office_pb.GetOfficeRequest)) {
    throw new Error('Expected argument of type GetOfficeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetOfficeRequest(buffer_arg) {
  return Protos_Office_pb.GetOfficeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetOfficeResponse(arg) {
  if (!(arg instanceof Protos_Office_pb.GetOfficeResponse)) {
    throw new Error('Expected argument of type GetOfficeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetOfficeResponse(buffer_arg) {
  return Protos_Office_pb.GetOfficeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_UpdateOfficeRequest(arg) {
  if (!(arg instanceof Protos_Office_pb.UpdateOfficeRequest)) {
    throw new Error('Expected argument of type UpdateOfficeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UpdateOfficeRequest(buffer_arg) {
  return Protos_Office_pb.UpdateOfficeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_UpdateOfficeResponse(arg) {
  if (!(arg instanceof Protos_Office_pb.UpdateOfficeResponse)) {
    throw new Error('Expected argument of type UpdateOfficeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UpdateOfficeResponse(buffer_arg) {
  return Protos_Office_pb.UpdateOfficeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var OfficesService = exports.OfficesService = {
  createOffice: {
    path: '/Offices/CreateOffice',
    requestStream: false,
    responseStream: false,
    requestType: Protos_Office_pb.CreateOfficeRequest,
    responseType: Protos_Office_pb.CreateOfficeResponse,
    requestSerialize: serialize_CreateOfficeRequest,
    requestDeserialize: deserialize_CreateOfficeRequest,
    responseSerialize: serialize_CreateOfficeResponse,
    responseDeserialize: deserialize_CreateOfficeResponse,
  },
  updateOffice: {
    path: '/Offices/UpdateOffice',
    requestStream: false,
    responseStream: false,
    requestType: Protos_Office_pb.UpdateOfficeRequest,
    responseType: Protos_Office_pb.UpdateOfficeResponse,
    requestSerialize: serialize_UpdateOfficeRequest,
    requestDeserialize: deserialize_UpdateOfficeRequest,
    responseSerialize: serialize_UpdateOfficeResponse,
    responseDeserialize: deserialize_UpdateOfficeResponse,
  },
  cancelOffice: {
    path: '/Offices/CancelOffice',
    requestStream: false,
    responseStream: false,
    requestType: Protos_Office_pb.CancelOfficeRequest,
    responseType: Protos_Office_pb.CancelOfficeResponse,
    requestSerialize: serialize_CancelOfficeRequest,
    requestDeserialize: deserialize_CancelOfficeRequest,
    responseSerialize: serialize_CancelOfficeResponse,
    responseDeserialize: deserialize_CancelOfficeResponse,
  },
  getOffice: {
    path: '/Offices/GetOffice',
    requestStream: false,
    responseStream: false,
    requestType: Protos_Office_pb.GetOfficeRequest,
    responseType: Protos_Office_pb.GetOfficeResponse,
    requestSerialize: serialize_GetOfficeRequest,
    requestDeserialize: deserialize_GetOfficeRequest,
    responseSerialize: serialize_GetOfficeResponse,
    responseDeserialize: deserialize_GetOfficeResponse,
  },
  getAllOffice: {
    path: '/Offices/GetAllOffice',
    requestStream: false,
    responseStream: false,
    requestType: Protos_Office_pb.GetAllOfficeRequest,
    responseType: Protos_Office_pb.GetAllOfficeResponse,
    requestSerialize: serialize_GetAllOfficeRequest,
    requestDeserialize: deserialize_GetAllOfficeRequest,
    responseSerialize: serialize_GetAllOfficeResponse,
    responseDeserialize: deserialize_GetAllOfficeResponse,
  },
};

exports.OfficesClient = grpc.makeGenericClientConstructor(OfficesService, 'Offices');
