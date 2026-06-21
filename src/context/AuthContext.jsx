import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => sessionStorage.getItem('sg_token') || null);
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      // Aquí simularás o conectarás tu llamada fetch/gRPC al endpoint de Login
      // const response = await api.login(username, password);
      // const newToken = response.token;
      
      const newToken = "SuperGiros@2026!"; // Tu token dinámico de Swagger
      
      setToken(newToken);
      sessionStorage.setItem('sg_token', newToken);
      setUser({ username, role: 'Administrador' });
      return { success: true };
    } catch (error) {
      console.error("Error de autenticación", error);
      return { success: false, error };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem('sg_token');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);