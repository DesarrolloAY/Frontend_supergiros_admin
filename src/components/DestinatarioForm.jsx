// src/components/DestinatarioForm.jsx
import { useState, useEffect } from 'react';

export default function DestinatarioForm({ onCambio }) {
  const [destinatario, setDestinatario] = useState({ dni: '', nombres: '', sucursal: '' });

  const handleChange = (e) => {
    setDestinatario({ ...destinatario, [e.target.name]: e.target.value });
  };

  // Reporta al padre en tiempo real
  useEffect(() => {
    if (onCambio) {
      onCambio(destinatario);
    }
  }, [destinatario, onCambio]);

  return (
    <div className="w-full text-left mt-2 flex flex-col gap-3 relative z-10">
      <div>
        <label className="block text-xs font-bold text-sg-secondary mb-1 ml-1">DNI Beneficiario</label>
        <input 
          type="text" 
          name="dni"
          value={destinatario.dni}
          onChange={handleChange}
          placeholder="Ej. 45123456" 
          maxLength="8"
          className="w-full px-4 py-2.5 rounded-xl border border-blue-100 bg-white/60 focus:bg-white focus:ring-2 focus:ring-sg-tertiary focus:border-transparent outline-none transition-all shadow-sm text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-sg-secondary mb-1 ml-1">Nombres del Beneficiario</label>
        <input 
          type="text" 
          name="nombres"
          value={destinatario.nombres}
          onChange={handleChange}
          placeholder="Ej. María Condori" 
          className="w-full px-4 py-2.5 rounded-xl border border-blue-100 bg-white/60 focus:bg-white focus:ring-2 focus:ring-sg-tertiary focus:border-transparent outline-none transition-all shadow-sm text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-sg-secondary mb-1 ml-1">Sucursal / Destino</label>
        <select 
          name="sucursal"
          value={destinatario.sucursal}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-blue-100 bg-white/60 focus:bg-white focus:ring-2 focus:ring-sg-tertiary focus:border-transparent outline-none transition-all shadow-sm text-sm text-gray-600"
        >
          <option value="">Seleccione destino...</option>
          <option value="cusco">Cusco Central</option>
          <option value="santiago">Santiago</option>
          <option value="wanchaq">Wanchaq</option>
          <option value="lima">Lima Norte</option>
        </select>
      </div>
    </div>
  );
}