import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginView } from './views/LoginView';
import { TransactionForm } from './components/TransactionForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Si entran a la raíz, ven el Login */}
        <Route path="/" element={<LoginView />} />
        
        {/* Si el Login los manda a /emision, ven el Formulario */}
        <Route path="/emision" element={<TransactionForm />} />
        
        {/* Cualquier otra ruta los regresa al Login por seguridad */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;