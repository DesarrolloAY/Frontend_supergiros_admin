import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';
import * as Protos_Common_pb from '../Protos/Common_pb';


export class CreateTransactionRequest extends jspb.Message {
  getAccountid(): number;
  setAccountid(value: number): CreateTransactionRequest;

  getTipomovimiento(): TransactionType;
  setTipomovimiento(value: TransactionType): CreateTransactionRequest;

  getMonto(): number;
  setMonto(value: number): CreateTransactionRequest;

  getMoneda(): string;
  setMoneda(value: string): CreateTransactionRequest;

  getDescripcion(): string;
  setDescripcion(value: string): CreateTransactionRequest;

  getSede(): string;
  setSede(value: string): CreateTransactionRequest;

  getFecharealizacion(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setFecharealizacion(value?: google_protobuf_timestamp_pb.Timestamp): CreateTransactionRequest;
  hasFecharealizacion(): boolean;
  clearFecharealizacion(): CreateTransactionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTransactionRequest): CreateTransactionRequest.AsObject;
  static serializeBinaryToWriter(message: CreateTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTransactionRequest;
  static deserializeBinaryFromReader(message: CreateTransactionRequest, reader: jspb.BinaryReader): CreateTransactionRequest;
}

export namespace CreateTransactionRequest {
  export type AsObject = {
    accountid: number,
    tipomovimiento: TransactionType,
    monto: number,
    moneda: string,
    descripcion: string,
    sede: string,
    fecharealizacion?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class CreateTransactionResponse extends jspb.Message {
  getServerresponse(): Protos_Common_pb.ServerResponse | undefined;
  setServerresponse(value?: Protos_Common_pb.ServerResponse): CreateTransactionResponse;
  hasServerresponse(): boolean;
  clearServerresponse(): CreateTransactionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTransactionResponse): CreateTransactionResponse.AsObject;
  static serializeBinaryToWriter(message: CreateTransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTransactionResponse;
  static deserializeBinaryFromReader(message: CreateTransactionResponse, reader: jspb.BinaryReader): CreateTransactionResponse;
}

export namespace CreateTransactionResponse {
  export type AsObject = {
    serverresponse?: Protos_Common_pb.ServerResponse.AsObject,
  }
}

export class UpdateTransactionRequest extends jspb.Message {
  getId(): number;
  setId(value: number): UpdateTransactionRequest;

  getAccountid(): number;
  setAccountid(value: number): UpdateTransactionRequest;

  getTipomovimiento(): TransactionType;
  setTipomovimiento(value: TransactionType): UpdateTransactionRequest;

  getMonto(): number;
  setMonto(value: number): UpdateTransactionRequest;

  getMoneda(): string;
  setMoneda(value: string): UpdateTransactionRequest;

  getDescripcion(): string;
  setDescripcion(value: string): UpdateTransactionRequest;

  getSede(): string;
  setSede(value: string): UpdateTransactionRequest;

  getFecharealizacion(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setFecharealizacion(value?: google_protobuf_timestamp_pb.Timestamp): UpdateTransactionRequest;
  hasFecharealizacion(): boolean;
  clearFecharealizacion(): UpdateTransactionRequest;

  getState(): TransactionState;
  setState(value: TransactionState): UpdateTransactionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateTransactionRequest): UpdateTransactionRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateTransactionRequest;
  static deserializeBinaryFromReader(message: UpdateTransactionRequest, reader: jspb.BinaryReader): UpdateTransactionRequest;
}

export namespace UpdateTransactionRequest {
  export type AsObject = {
    id: number,
    accountid: number,
    tipomovimiento: TransactionType,
    monto: number,
    moneda: string,
    descripcion: string,
    sede: string,
    fecharealizacion?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    state: TransactionState,
  }
}

export class UpdateTransactionResponse extends jspb.Message {
  getServerresponse(): Protos_Common_pb.ServerResponse | undefined;
  setServerresponse(value?: Protos_Common_pb.ServerResponse): UpdateTransactionResponse;
  hasServerresponse(): boolean;
  clearServerresponse(): UpdateTransactionResponse;

  getData(): TransactionResponse | undefined;
  setData(value?: TransactionResponse): UpdateTransactionResponse;
  hasData(): boolean;
  clearData(): UpdateTransactionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateTransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateTransactionResponse): UpdateTransactionResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateTransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateTransactionResponse;
  static deserializeBinaryFromReader(message: UpdateTransactionResponse, reader: jspb.BinaryReader): UpdateTransactionResponse;
}

export namespace UpdateTransactionResponse {
  export type AsObject = {
    serverresponse?: Protos_Common_pb.ServerResponse.AsObject,
    data?: TransactionResponse.AsObject,
  }
}

export class CancelTransactionRequest extends jspb.Message {
  getId(): number;
  setId(value: number): CancelTransactionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CancelTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CancelTransactionRequest): CancelTransactionRequest.AsObject;
  static serializeBinaryToWriter(message: CancelTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CancelTransactionRequest;
  static deserializeBinaryFromReader(message: CancelTransactionRequest, reader: jspb.BinaryReader): CancelTransactionRequest;
}

export namespace CancelTransactionRequest {
  export type AsObject = {
    id: number,
  }
}

export class CancelTransactionResponse extends jspb.Message {
  getServerresponse(): Protos_Common_pb.ServerResponse | undefined;
  setServerresponse(value?: Protos_Common_pb.ServerResponse): CancelTransactionResponse;
  hasServerresponse(): boolean;
  clearServerresponse(): CancelTransactionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CancelTransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CancelTransactionResponse): CancelTransactionResponse.AsObject;
  static serializeBinaryToWriter(message: CancelTransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CancelTransactionResponse;
  static deserializeBinaryFromReader(message: CancelTransactionResponse, reader: jspb.BinaryReader): CancelTransactionResponse;
}

export namespace CancelTransactionResponse {
  export type AsObject = {
    serverresponse?: Protos_Common_pb.ServerResponse.AsObject,
  }
}

export class GetTransactionRequest extends jspb.Message {
  getId(): number;
  setId(value: number): GetTransactionRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionRequest): GetTransactionRequest.AsObject;
  static serializeBinaryToWriter(message: GetTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionRequest;
  static deserializeBinaryFromReader(message: GetTransactionRequest, reader: jspb.BinaryReader): GetTransactionRequest;
}

export namespace GetTransactionRequest {
  export type AsObject = {
    id: number,
  }
}

export class GetTransactionResponse extends jspb.Message {
  getServerresponse(): Protos_Common_pb.ServerResponse | undefined;
  setServerresponse(value?: Protos_Common_pb.ServerResponse): GetTransactionResponse;
  hasServerresponse(): boolean;
  clearServerresponse(): GetTransactionResponse;

  getData(): TransactionResponse | undefined;
  setData(value?: TransactionResponse): GetTransactionResponse;
  hasData(): boolean;
  clearData(): GetTransactionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionResponse): GetTransactionResponse.AsObject;
  static serializeBinaryToWriter(message: GetTransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionResponse;
  static deserializeBinaryFromReader(message: GetTransactionResponse, reader: jspb.BinaryReader): GetTransactionResponse;
}

export namespace GetTransactionResponse {
  export type AsObject = {
    serverresponse?: Protos_Common_pb.ServerResponse.AsObject,
    data?: TransactionResponse.AsObject,
  }
}

export class GetAllTransactionRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllTransactionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllTransactionRequest): GetAllTransactionRequest.AsObject;
  static serializeBinaryToWriter(message: GetAllTransactionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllTransactionRequest;
  static deserializeBinaryFromReader(message: GetAllTransactionRequest, reader: jspb.BinaryReader): GetAllTransactionRequest;
}

export namespace GetAllTransactionRequest {
  export type AsObject = {
  }
}

export class GetAllTransactionResponse extends jspb.Message {
  getServerresponse(): Protos_Common_pb.ServerResponse | undefined;
  setServerresponse(value?: Protos_Common_pb.ServerResponse): GetAllTransactionResponse;
  hasServerresponse(): boolean;
  clearServerresponse(): GetAllTransactionResponse;

  getDataList(): Array<TransactionResponse>;
  setDataList(value: Array<TransactionResponse>): GetAllTransactionResponse;
  clearDataList(): GetAllTransactionResponse;
  addData(value?: TransactionResponse, index?: number): TransactionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllTransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAllTransactionResponse): GetAllTransactionResponse.AsObject;
  static serializeBinaryToWriter(message: GetAllTransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAllTransactionResponse;
  static deserializeBinaryFromReader(message: GetAllTransactionResponse, reader: jspb.BinaryReader): GetAllTransactionResponse;
}

export namespace GetAllTransactionResponse {
  export type AsObject = {
    serverresponse?: Protos_Common_pb.ServerResponse.AsObject,
    dataList: Array<TransactionResponse.AsObject>,
  }
}

export class TransactionResponse extends jspb.Message {
  getId(): number;
  setId(value: number): TransactionResponse;

  getAccountid(): number;
  setAccountid(value: number): TransactionResponse;

  getTipomovimiento(): TransactionType;
  setTipomovimiento(value: TransactionType): TransactionResponse;

  getMonto(): number;
  setMonto(value: number): TransactionResponse;

  getMoneda(): string;
  setMoneda(value: string): TransactionResponse;

  getDescripcion(): string;
  setDescripcion(value: string): TransactionResponse;

  getSede(): string;
  setSede(value: string): TransactionResponse;

  getFecharealizacion(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setFecharealizacion(value?: google_protobuf_timestamp_pb.Timestamp): TransactionResponse;
  hasFecharealizacion(): boolean;
  clearFecharealizacion(): TransactionResponse;

  getState(): TransactionState;
  setState(value: TransactionState): TransactionResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionResponse): TransactionResponse.AsObject;
  static serializeBinaryToWriter(message: TransactionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionResponse;
  static deserializeBinaryFromReader(message: TransactionResponse, reader: jspb.BinaryReader): TransactionResponse;
}

export namespace TransactionResponse {
  export type AsObject = {
    id: number,
    accountid: number,
    tipomovimiento: TransactionType,
    monto: number,
    moneda: string,
    descripcion: string,
    sede: string,
    fecharealizacion?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    state: TransactionState,
  }
}

export enum TransactionType { 
  TRANSFERENCIA = 0,
  GIRO = 1,
}
export enum TransactionState { 
  TRANSACTION_INACTIVO = 0,
  TRANSACTION_ACTIVO = 1,
  TRANSACTION_COMPLETADO = 2,
}
