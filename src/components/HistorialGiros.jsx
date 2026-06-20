// src/components/HistorialGiros.jsx
import { useState } from 'react';

export default function HistorialGiros() {
  // Datos simulados (Mock Data) que luego vendrán de SQL Server
  const girosSimulados = [
    { id: "SG-1001", remitente: "Juan Pérez", destinatario: "María Condori", monto: 450.00, destino: "Cusco Central", estado: "Pendiente", fecha: "2026-06-18" },
    { id: "SG-1002", remitente: "Arely Mollo", destinatario: "Luis Mollo", monto: 1200.00, destino: "Lima Norte", estado: "Cobrado", fecha: "2026-06-17" },
    { id: "SG-1003", remitente: "Carlos Ttito", destinatario: "Ana Quispe", monto: 150.00, destino: "Wanchaq", estado: "Pendiente", fecha: "2026-06-15" },
    { id: "SG-1004", remitente: "Lucía Huamán", destinatario: "Pedro Mamani", monto: 800.00, destino: "Santiago", estado: "Cobrado", fecha: "2026-06-14" },
  ];

  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  // Lógica de filtrado en tiempo real
  const girosFiltrados = girosSimulados.filter(giro => {
    const coincideBusqueda = giro.remitente.toLowerCase().includes(busqueda.toLowerCase()) || 
                             giro.destinatario.toLowerCase().includes(busqueda.toLowerCase()) ||
                             giro.id.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideEstado = filtroEstado === 'Todos' || giro.estado === filtroEstado;
    
    return coincideBusqueda && coincideEstado;
  });

  return (
    <div className="w-full space-y-6">
      {/* Barra de Filtros Creativos */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50 p-4 rounded-2xl border border-blue-50 shadow-inner">
        {/* Input de búsqueda inteligente */}
        <div className="relative w-full md:flex-1">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input 
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por código, remitente o destinatario..."
            className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-blue-100 bg-white focus:ring-2 focus:ring-sg-tertiary outline-none transition-all text-sm"
          />
        </div>

        {/* Botones de Filtro de Estado Estilo "Pills" */}
        <div className="flex bg-white p-1 rounded-xl border border-blue-50 shadow-sm w-full md:w-auto justify-center">
          {['Todos', 'Pendiente', 'Cobrado'].map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filtroEstado === estado 
                  ? 'bg-gradient-to-r from-sg-primary to-sg-secondary text-white shadow-md' 
                  : 'text-gray-500 hover:text-sg-primary hover:bg-gray-50'
              }`}
            >
              {estado === 'Todos' ? '🌍 Todos' : estado === 'Pendiente' ? '⏳ Pendientes' : '✅ Cobrados'}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla Responsiva con Contenedor de Scroll */}
      <div className="overflow-hidden border border-gray-100 rounded-2xl shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-sg-primary/5 to-sg-secondary/5 text-sg-primary border-b border-gray-100">
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider">Código</th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider">Fecha</th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider">Remitente</th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider">Destinatario</th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider">Destino</th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider">Monto</th>
                <th className="p-4 text-xs font-extrabold uppercase tracking-wider text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {girosFiltrados.length > 0 ? (
                girosFiltrados.map((giro) => (
                  <tr key={giro.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-4 font-bold text-sg-secondary">{giro.id}</td>
                    <td className="p-4 text-gray-500">{giro.fecha}</td>
                    <td className="p-4 font-medium text-sg-dark">{giro.remitente}</td>
                    <td className="p-4 font-medium text-sg-dark">{giro.destinatario}</td>
                    <td className="p-4 text-gray-600 font-medium">{giro.destino}</td>
                    <td className="p-4 font-bold text-sg-primary">S/. {giro.monto.toFixed(2)}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        giro.estado === 'Pendiente' 
                          ? 'bg-amber-50 text-amber-600 border border-amber-200' 
                          : 'bg-green-50 text-green-600 border border-green-200'
                      }`}>
                        {giro.estado}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-400 font-medium">
                    ❌ No se encontraron giros con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}