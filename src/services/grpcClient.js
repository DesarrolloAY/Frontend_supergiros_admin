// src/services/grpcClient.js
import { TransactionsClient } from "../Protos/TransactionServiceClientPb";

const BASE_URL = 'http://127.0.0.1:60558'; // Puerto HTTP actual del túnel

export const transactionClient = new TransactionsClient(BASE_URL, null, null);

export const executeGrpcCall = (clientMethod, requestMessage) => {
  return new Promise((resolve, reject) => {
    const token = sessionStorage.getItem('sg_token');
    const metadata = token ? { 'Authorization': `Bearer ${token}` } : {};

    clientMethod.call(transactionClient, requestMessage, metadata, (err, response) => {
      if (err) {
        console.error("❌ Error gRPC:", err);
        reject(err);
      } else {
        // Al usar toObject() evitamos problemas con constructores de Protobuf internos
        resolve(response.toObject());
      }
    });
  });
};