import * as jspb from 'google-protobuf'



export class ServerResponse extends jspb.Message {
  getIssuccess(): boolean;
  setIssuccess(value: boolean): ServerResponse;

  getMessage(): string;
  setMessage(value: string): ServerResponse;

  getErrors(): string;
  setErrors(value: string): ServerResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ServerResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ServerResponse): ServerResponse.AsObject;
  static serializeBinaryToWriter(message: ServerResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ServerResponse;
  static deserializeBinaryFromReader(message: ServerResponse, reader: jspb.BinaryReader): ServerResponse;
}

export namespace ServerResponse {
  export type AsObject = {
    issuccess: boolean,
    message: string,
    errors: string,
  }
}

