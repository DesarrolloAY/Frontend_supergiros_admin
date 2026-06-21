import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const LoginView = () => {
  const [dni, setDni] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleDniChange = (e) => {
    // Solo permite números y máximo 8 dígitos
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 8) setDni(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (dni.length !== 8) {
      return Swal.fire({
        icon: 'warning',
        title: 'Validación',
        text: 'El DNI debe tener exactamente 8 dígitos.',
        confirmButtonColor: '#1261A6'
      });
    }

    if (password.trim() === '') {
      return Swal.fire({
        icon: 'warning',
        title: 'Validación',
        text: 'La contraseña es obligatoria.',
        confirmButtonColor: '#1261A6'
      });
    }

    // Simulador de autenticación
    // Simulador de autenticación
    sessionStorage.setItem('sg_token', 'token-seguro-simulado');
    navigate('/emision');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md border-t-4" style={{ borderColor: '#1261A6' }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Super<span style={{ color: '#1261A6' }}>Giros</span></h1>
          <p className="text-gray-500 mt-2 text-sm">Portal de Operaciones Seguras</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">DNI del Operador</label>
            <input
              type="text"
              value={dni}
              onChange={handleDniChange}
              placeholder="Ingrese su DNI"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none transition-all font-mono tracking-widest text-lg"
              style={{ focusRingColor: '#1261A6' }}
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Clave de Acceso</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none transition-all font-mono tracking-widest text-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all flex justify-center items-center gap-2 mt-4"
            style={{ backgroundColor: '#1261A6' }}
          >
            Ingresar al Sistema
          </button>
        </form>
      </div>
    </div>
  );
};