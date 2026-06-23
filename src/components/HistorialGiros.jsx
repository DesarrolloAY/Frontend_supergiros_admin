import { useState, useEffect } from 'react';
import { executeGrpcCall, transactionClient } from '../services/grpcClient';
import "../Protos/Transaction_pb.js"; // Asegúrate de que la ruta sea correcta
// IMPORTANTE: Asegurar que los tipos comunes también se carguen en el scope
import "../Protos/Common_pb.js"; 
import "../Protos/Transaction_pb.js";
const TransactionPb = window.proto.Protos || window.proto;

export default function HistorialGiros() {
  const [girosReales, setGirosReales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorAcceso, setErrorAcceso] = useState(null);
  
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  
  // Todo el flujo de carga encapsulado dentro del Effect (La forma recomendada en React)
  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      setErrorAcceso(null);
      
      try {
        const request = new TransactionPb.GetAllTransactionRequest();
        const response = await executeGrpcCall(transactionClient.getAllTransaction, request);
        
        // Mapeamos los datos de Protobuf a un objeto fácil para tu tabla
        if (response.dataList && response.dataList.length > 0) {
          const datosMapeados = response.dataList.map(item => ({
            id: `SG-${item.id}`,
            remitente: item.accountid,
            destinatario: "N/A",
            monto: item.monto,
            destino: item.sede,
            estado: item.state === 1 ? "Cobrado" : "Pendiente",
            fecha: new Date(item.fecharealizacion.seconds * 1000).toLocaleDateString()
          }));
          setGirosReales(datosMapeados);
        } else {
          setGirosReales([]);
        }
      } catch (error) {
        console.error("Error al cargar historial:", error);
        setErrorAcceso("No tienes permisos suficientes para ver el historial o hubo un error de red.");
      } finally {
        setCargando(false);
      }
    };

    // Llamamos a la función asíncrona justo después de definirla
    cargarDatos();
  }, []); // El array vacío asegura que esto solo pase 1 vez al cargar la vista

  // Lógica de filtrado en tiempo real (ahora usando girosReales)
  const girosFiltrados = girosReales.filter(giro => {
    const coincideBusqueda = giro.remitente.toString().toLowerCase().includes(busqueda.toLowerCase()) || 
                             giro.id.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === 'Todos' || giro.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  return (
    <div className="w-full space-y-6">
      {/* Tu barra de filtros creativos sigue igual */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 p-4 rounded-2xl border border-blue-50 shadow-inner">
        <div className="relative w-full md:flex-1">
          <input 
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por código, remitente..."
            className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-blue-100 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
          />
        </div>

        <div className="flex bg-white p-1 rounded-xl border border-blue-50 shadow-sm w-full md:w-auto justify-center">
          {['Todos', 'Pendiente', 'Cobrado'].map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filtroEstado === estado 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              {estado === 'Todos' ? '🌍 Todos' : estado === 'Pendiente' ? '⏳ Pendientes' : '✅ Cobrados'}
            </button>
          ))}
        </div>
      </div>

      {/* Manejo de Estados (Cargando, Error, o Tabla) */}
      {cargando ? (
        <div className="p-10 text-center text-slate-500 font-medium">
          <i className="fa-solid fa-spinner fa-spin text-3xl mb-4 text-blue-500"></i>
          <p>Cargando registros de SQL Server...</p>
        </div>
      ) : errorAcceso ? (
        <div className="p-8 text-center bg-red-50 border border-red-200 rounded-2xl text-red-600 font-medium shadow-inner">
          <i className="fa-solid fa-lock text-4xl mb-3"></i>
          <p>{errorAcceso}</p>
        </div>
      ) : (
        <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-50/50 text-blue-800 border-b border-gray-100">
                  <th className="p-4 text-xs font-extrabold uppercase tracking-wider">Código</th>
                  <th className="p-4 text-xs font-extrabold uppercase tracking-wider">Fecha</th>
                  <th className="p-4 text-xs font-extrabold uppercase tracking-wider">Remitente DNI</th>
                  <th className="p-4 text-xs font-extrabold uppercase tracking-wider">Destino</th>
                  <th className="p-4 text-xs font-extrabold uppercase tracking-wider">Monto</th>
                  <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {girosFiltrados.length > 0 ? (
                  girosFiltrados.map((giro) => (
                    <tr key={giro.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-4 font-bold text-blue-700">{giro.id}</td>
                      <td className="p-4 text-gray-500">{giro.fecha}</td>
                      <td className="p-4 font-medium text-slate-800">{giro.remitente}</td>
                      <td className="p-4 text-gray-600 font-medium">{giro.destino}</td>
                      <td className="p-4 font-bold text-blue-600">S/ {giro.monto.toFixed(2)}</td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          giro.estado === 'Pendiente' 
                            ? 'bg-amber-50 text-amber-600 border border-amber-200' 
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        }`}>
                          {giro.estado}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-400 font-medium">
                      ❌ No se encontraron giros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}