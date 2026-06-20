// src/components/MontoForm.jsx
import { useState } from 'react';

export default function MontoForm({ onEnviarGiro }) {
  const [monto, setMonto] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!monto || parseFloat(monto) <= 0) {
      alert("Por favor, ingrese un monto válido.");
      return;
    }
    
    setLoading(true);
    await onEnviarGiro(monto);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-left">
      <div className="flex-1 w-full">
        <label className="block text-xs font-bold text-sg-primary mb-1 ml-1">Importe del Giro (S/.)</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-sg-secondary font-extrabold text-lg">S/.</span>
          <input 
            type="number" 
            step="0.01"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="0.00" 
            className="w-full pl-14 pr-4 py-3.5 rounded-2xl border border-blue-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-sg-tertiary focus:border-transparent outline-none transition-all shadow-inner text-lg font-bold text-sg-dark"
          />
        </div>
      </div>

      <div className="w-full md:w-auto pt-5">
        <button 
          type="submit"
          disabled={loading}
          className="w-full md:w-64 px-6 py-4 rounded-2xl bg-gradient-to-r from-sg-primary to-sg-secondary text-white font-extrabold text-base shadow-[0_4px_20px_rgba(55,68,140,0.3)] hover:scale-[1.03] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer text-center flex items-center justify-center gap-2"
        >
          {loading ? (
            'Procesando...'
          ) : (
            <>
              <span>🚀</span> Emitir Giro Seguro
            </>
          )}
        </button>
      </div>
    </form>
  );
}