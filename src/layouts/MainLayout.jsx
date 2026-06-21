import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar - Basado en tu diseño original oscuro */}
      <aside className="w-64 bg-[#0B132B] text-white flex flex-col">
        <div className="p-6 text-center border-b border-gray-700">
          <h1 className="text-2xl font-bold tracking-wider">SuperGiros</h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* NavLink maneja la clase 'active' automáticamente */}
          <NavLink 
            to="/emision" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'}`
            }
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Emisión de Giros
          </NavLink>

          <NavLink 
            to="/historial" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'}`
            }
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Historial de Giros
          </NavLink>
        </nav>

        {/* Perfil Inferior */}
        <div className="p-4 bg-[#1C2541] border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">{user?.username || 'Operador'}</p>
              <p className="text-xs text-green-400">● Local Activo</p>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-white" title="Cerrar Sesión">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm z-10 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Portal de Ventas</h2>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
            ● Canales gRPC Operativos
          </span>
        </header>

        {/* Área de renderizado dinámico (donde irá el formulario de emisión) */}
        <div className="flex-1 overflow-auto p-6 bg-gray-100">
          {children}
        </div>
      </main>
    </div>
  );
};