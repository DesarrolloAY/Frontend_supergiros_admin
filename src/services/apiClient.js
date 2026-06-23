import * as grpcWeb from 'grpc-web';
import '../Protos/Protos/Transaction_pb.js';
import '../Protos/Protos/Customer_pb.js';

const GRPC_HOST = 'http://127.0.0.1:60558';
// 🔥 IMPORTANTE: Pega aquí tu token válido actual (el que obtuviste de Swagger)
const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImp0aSI6Ijg4ODA4M2VlLTU1MGMtNGFhNy1iMjdmLTBhN2FmN2IzZGU0MiIsImV4cCI6MTc4MTk0ODU3NSwiaXNzIjoiU3VwZXJHaXJvcy5UcmFuc2Zlci5BUEkiLCJhdWQiOiJTdXBlckdpcm9zLlRyYW5zZmVyLlVzZXJzIn0.Wb9c5yXTXB-hN-_t9Ht9Q41Ywj7qFPnDEiSAAkm8UO0'; 

const getProtoClass = (fullClassName) => {
    if (!window.proto || !window.proto.Protos) return null;
    return window.proto.Protos[fullClassName];
};

export const registrarGiro = async (datos) => {
  return new Promise((resolve, reject) => {
    try {
      const CreateTransactionRequest = getProtoClass('CreateTransactionRequest');
      if (!CreateTransactionRequest) throw new Error("CreateTransactionRequest no encontrado");

      const request = new CreateTransactionRequest();
      request.setAccountid(parseInt(datos.remitente.dni));
      request.setTipomovimiento(1);
      request.setMonto(parseFloat(datos.monto));
      request.setMoneda("PEN");
      request.setDescripcion(`Giro: ${datos.destinatario.nombres}`);
      request.setSede(datos.destinatario.sucursal);

      const client = new grpcWeb.GrpcWebClientBase({ format: 'text' });

      const methodDescriptor = new grpcWeb.MethodDescriptor(
        '/Protos.Transactions/CreateTransaction',
        grpcWeb.MethodType.UNARY,
        CreateTransactionRequest,
        Object,
        (req) => req.serializeBinary(),
        (bytes) => bytes
      );

      client.rpcCall(GRPC_HOST + '/Protos.Transactions/CreateTransaction', request, { 'authorization': AUTH_TOKEN }, methodDescriptor, (err, response) => {
        if (err) {
            console.error("❌ Error gRPC (Registrar):", err);
            reject(err);
        } else resolve({ isSuccess: true, data: response });
      });
    } catch (error) { reject(error); }
  });
};

export const buscarClientePorDni = async (dni) => {
  return new Promise((resolve, reject) => {
    try {
      // 1. Obtenemos las clases (Request y Response)
      const RequestClass = getProtoClass('GetCustomerByDniRequest');
      const ResponseClass = getProtoClass('GetCustomerByDniResponse');
      
      if (!RequestClass || !ResponseClass) throw new Error("Clases Proto no encontradas");

      const request = new RequestClass();
      request.setNrodocumento(parseInt(dni)); 

      const client = new grpcWeb.GrpcWebClientBase({ format: 'text' });
      
      // 2. CORRECCIÓN CRÍTICA: Usamos el ResponseClass y su deserializador
      const methodDescriptor = new grpcWeb.MethodDescriptor(
        '/Protos.Customers/GetCustomerByDni',
        grpcWeb.MethodType.UNARY,
        RequestClass,
        ResponseClass, // <-- Ya no es 'Object'
        (req) => req.serializeBinary(),
        (bytes) => ResponseClass.deserializeBinary(bytes) // <-- Deserialización real
      );

      client.rpcCall(GRPC_HOST + '/Protos.Customers/GetCustomerByDni', request, { 'authorization': AUTH_TOKEN }, methodDescriptor, (err, response) => {
        if (err) {
            console.error("❌ Error gRPC (Consultar):", err);
            reject(err);
        } else {
            // 3. Convertimos el objeto protobuf a JSON para que tu React lo entienda
            const data = response.toObject();
            console.log("✅ Respuesta cliente:", data);
            resolve(data);
        }
      });
    } catch (error) { 
        console.error("❌ Excepción:", error);
        reject(error); 
    }
  });
};