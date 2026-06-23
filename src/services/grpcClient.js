import { TransactionsClient } from "../Protos/TransactionServiceClientPb";

// 🔥 AQUÍ ESTABA EL ERROR: DEBE SER EL PUERTO gRPC (60559)
const BASE_URL = 'http://127.0.0.1:60559'; 

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