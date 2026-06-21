import React from 'react';

// Recibe los datos de la transacción confirmada como 'props'
export const VoucherPrint = ({ data }) => {
  if (!data) return null;

  const fechaActual = new Date().toLocaleString('es-PE', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  const total = parseFloat(data.monto) + parseFloat(data.comision);

  return (
    // Oculto en pantalla (hidden), visible al imprimir (print:block)
    <div className="hidden print:block text-black bg-white font-mono text-sm w-[80mm] p-4 mx-auto">
      
      {/* Cabecera del Ticket */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wider">SuperGiros</h1>
        <p className="text-xs mt-1">Servicio de Transferencias Rápidas</p>
        <p className="text-xs">RUC: 20123456789</p>
        <p className="text-xs">Central: Cusco, Perú</p>
      </div>

      <div className="border-b-2 border-dashed border-gray-400 mb-4"></div>

      {/* Datos del Comprobante */}
      <div className="mb-4">
        <p><span className="font-bold">Fecha:</span> {fechaActual}</p>
        <p><span className="font-bold">Cajero:</span> Admin</p>
        <p><span className="font-bold">Sede Origen:</span> Principal</p>
      </div>

      <div className="border-b-2 border-dashed border-gray-400 mb-4"></div>

      {/* Datos del Remitente */}
      <div className="mb-4">
        <p className="font-bold uppercase text-xs mb-1">--- Datos del Remitente ---</p>
        <p><span className="font-bold">DNI:</span> {data.dniRemitente}</p>
        <p><span className="font-bold">Nombre:</span> {data.nombresRemitente.substring(0, 20)}</p>
      </div>

      {/* Datos del Beneficiario */}
      <div className="mb-4">
        <p className="font-bold uppercase text-xs mb-1">--- Datos del Beneficiario ---</p>
        <p><span className="font-bold">DNI:</span> {data.dniBeneficiario}</p>
        <p><span className="font-bold">Nombre:</span> {data.nombresBeneficiario.substring(0, 20)}</p>
        <p><span className="font-bold">Destino:</span> {data.sedeDestino}</p>
      </div>

      <div className="border-b-2 border-dashed border-gray-400 mb-4"></div>

      {/* Importes */}
      <div className="mb-4 space-y-1">
        <div className="flex justify-between">
          <span>Importe Giro:</span>
          <span>S/ {parseFloat(data.monto).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Comisión:</span>
          <span>S/ {parseFloat(data.comision).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t border-gray-300">
          <span>TOTAL PAGADO:</span>
          <span>S/ {total.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-b-2 border-dashed border-gray-400 mb-4"></div>

      {/* Pie de página */}
      <div className="text-center text-xs space-y-2 mt-4">
        <p className="font-bold">¡Gracias por su preferencia!</p>
        <p>Conserve este voucher para cualquier reclamo. El pago en destino requiere DNI físico original.</p>
        <p>*** COPIA CLIENTE ***</p>
      </div>
    </div>
  );
};