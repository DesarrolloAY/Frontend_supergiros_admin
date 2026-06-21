import { TransactionsClient } from "../Protos/TransactionServiceClientPb";

// Apunta directamente al puerto expuesto en tu infraestructura de Kubernetes
const BASE_URL = 'http://localhost:5220'; 

// AQUÍ ESTÁ EL CAMBIO: Inicializamos con "TransactionsClient" y lo exportamos directamente
export const transactionClient = new TransactionsClient(BASE_URL, null, null);

/**
 * Helper para ejecutar llamadas gRPC inyectando metadatos de seguridad automáticamente.
 */
export const executeGrpcCall = (clientMethod, requestMessage) => {
  return new Promise((resolve, reject) => {
    const token = sessionStorage.getItem('sg_token');
    
    // Inyección automatizada de metadatos (Headers de seguridad)
    const metadata = token ? { 'Authorization': `Bearer ${token}` } : {};

    clientMethod.call(transactionClient, requestMessage, metadata, (err, response) => {
      if (err) {
        console.error(`❌ Error en llamada gRPC [${clientMethod.name}]:`, err);
        reject(err);
      } else {
        resolve(response.toObject());
      }
    });
  });
};