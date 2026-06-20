// src/components/RemitenteForm.jsx
import { useState, useEffect } from 'react';

export default function RemitenteForm({ onCambio }) {
  const [remitente, setRemitente] = useState({ dni: '', nombres: '', celular: '' });

  const handleChange = (e) => {
    setRemitente({ ...remitente, [e.target.name]: e.target.value });
  };

  // Cada vez que cambie DNI, Nombres o Celular, se lo reportamos al padre
  useEffect(() => {
    if (onCambio) {
      onCambio(remitente);
    }
  }, [remitente, onCambio]);

  return (
    <div className="w-full text-left mt-2 flex flex-col gap-3 relative z-10">
      <div>
        <label className="block text-xs font-bold text-sg-primary mb-1 ml-1">DNI Remitente</label>
        <input 
          type="text" 
          name="dni"
          value={remitente.dni}
          onChange={handleChange}
          placeholder="Ej. 72123456" 
          maxLength="8"
          className="w-full px-4 py-2.5 rounded-xl border border-blue-100 bg-white/60 focus:bg-white focus:ring-2 focus:ring-sg-tertiary focus:border-transparent outline-none transition-all shadow-sm text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-sg-primary mb-1 ml-1">Nombres Completos</label>
        <input 
          type="text" 
          name="nombres"
          value={remitente.nombres}
          onChange={handleChange}
          placeholder="Ej. Juan Pérez" 
          className="w-full px-4 py-2.5 rounded-xl border border-blue-100 bg-white/60 focus:bg-white focus:ring-2 focus:ring-sg-tertiary focus:border-transparent outline-none transition-all shadow-sm text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-sg-primary mb-1 ml-1">Celular (WhatsApp)</label>
        <input 
          type="tel" 
          name="celular"
          value={remitente.celular}
          onChange={handleChange}
          placeholder="Ej. 987654321" 
          maxLength="9"
          className="w-full px-4 py-2.5 rounded-xl border border-blue-100 bg-white/60 focus:bg-white focus:ring-2 focus:ring-sg-tertiary focus:border-transparent outline-none transition-all shadow-sm text-sm"
        />
      </div>
    </div>
  );
}