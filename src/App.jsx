// src/App.jsx
import { useState } from 'react';
import { registrarGiro, buscarClientePorDni } from './services/apiClient.js';

function App() {
  const [remitente, setRemitente] = useState({ dni: '', nombres: '', celular: '' });
  const [destinatario, setDestinatario] = useState({ dni: '', nombres: '', sucursal: 'Cusco Central' });
  const [monto, setMonto] = useState('');
  const [procesando, setProcesando] = useState(false);

  // ⚡ Lógica de autocompletado adaptada al nuevo GetCustomerByDni
  const handleBuscarRemitente = async () => {
    if (remitente.dni.length === 8) {
      try {
        console.log(`🔍 Consultando DNI Remitente: ${remitente.dni}`);
        const respuesta = await buscarClientePorDni(remitente.dni);
        
        // El formato de desempaquetado de grpc-web expone métodos en minúsculas/camelCase según el package
        if (respuesta && typeof respuesta.getData === 'function' && respuesta.getData()) {
          const data = respuesta.getData();
          
          // 🔄 Sincronización exacta con las propiedades generadas del nuevo contrato
          const nombre = data.getNombre ? data.getNombre() : '';
          const paterno = data.getApellidopaterno ? data.getApellidopaterno() : '';
          const materno = data.getApellidomaterno ? data.getApellidomaterno() : '';
          const celular = data.getCelular ? data.getCelular() : '';
          
          const nombreCompleto = `${nombre} ${paterno} ${materno}`.trim();

          setRemitente((prev) => ({
            ...prev,
            nombres: nombreCompleto || prev.nombres,
            celular: celular || prev.celular
          }));
          console.log("✨ Campos de remitente cargados automáticamente desde SQL Server.");
        }
      } catch (error) {
        console.log("Aviso: Cliente nuevo o sin registro previo. Proceder de forma manual.", error);
      }
    }
  };

  const handleEmitirGiro = async (e) => {
    e.preventDefault();
    setProcesando(true);

    const datosGiro = {
      remitente,
      destinatario,
      monto
    };

    try {
      const resultado = await registrarGiro(datosGiro);
      if (resultado && resultado.isSuccess) {
        alert("¡Giro emitido exitosamente por gRPC-Web y guardado en SQL Server!");
        setRemitente({ dni: '', nombres: '', celular: '' });
        setDestinatario({ dni: '', nombres: '', sucursal: 'Cusco Central' });
        setMonto('');
      }
    } catch (error) {
      console.error("Fallo de conexión gRPC:", error);
      alert(`Error de canal: ${error.message || error}`);
    } finally {
      setProcesando(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

        body { 
          margin: 0; 
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif; 
          background-color: #f8fafc; 
          color: #0f172a;
          -webkit-font-smoothing: antialiased;
        }
        
        .app-container { 
          display: flex; 
          height: 100vh; 
          width: 100vw;
          overflow: hidden; 
          box-sizing: border-box;
        }
        
        .sidebar { 
          width: 260px; 
          background: linear-gradient(195deg, #1e3a8a 0%, #0f172a 100%);
          color: white; 
          display: flex; 
          flex-direction: column; 
          padding: 32px 20px; 
          justify-content: space-between;
          margin: 16px 0 16px 16px;
          border-radius: 24px;
          box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.3);
          flex-shrink: 0;
          box-sizing: border-box;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 4px 8px;
        }
        .logo-img-branding {
          width: 42px;
          height: 42px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.3);
          background-color: white;
          transition: transform 0.3s ease;
        }
        .logo-section:hover .logo-img-branding {
          transform: rotate(5deg) scale(1.05);
        }
        .logo-section h2 { 
          margin: 0; 
          font-size: 24px; 
          font-weight: 800;
          letter-spacing: -0.5px;
          color: white;
        }

        .menu-nav { 
          display: flex; 
          flex-direction: column; 
          gap: 12px; 
          margin-top: 48px; 
          flex-grow: 1; 
        }
        
        .menu-btn { 
          background: none; 
          border: none; 
          color: #94a3b8; 
          text-align: left; 
          padding: 12px 14px; 
          font-size: 15px; 
          font-weight: 600;
          cursor: pointer; 
          border-radius: 14px; 
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
        }
        
        .menu-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          background-color: rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.25s ease;
          color: #94a3b8;
        }

        .menu-btn.active { 
          background-color: #2563eb; 
          color: white; 
          box-shadow: 0 10px 20px -5px rgba(37, 99, 235, 0.4);
        }
        .menu-btn.active .menu-icon-wrapper {
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.2);
        }

        .menu-btn:hover:not(.active) {
          background-color: rgba(255, 255, 255, 0.06);
          color: white;
          transform: translateX(4px);
        }
        .menu-btn:hover:not(.active) .menu-icon-wrapper {
          background-color: rgba(255, 255, 255, 0.18);
          color: #3b82f6;
        }
        
        .user-profile { 
          display: flex; 
          align-items: center; 
          gap: 14px; 
          background: rgba(255, 255, 255, 0.03);
          padding: 14px 16px; 
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        .avatar { 
          width: 38px; 
          height: 38px; 
          background-color: #2563eb; 
          color: white; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-weight: 700; 
          box-shadow: 0 0 15px rgba(37, 99, 235, 0.5);
        }
        .username { margin: 0; font-weight: 600; font-size: 14px; color: white; }
        .status-online { color: #10b981; font-size: 12px; display: flex; align-items: center; gap: 6px; margin-top: 3px; }
        
        .status-dot { 
          width: 7px; 
          height: 7px; 
          background-color: #10b981; 
          border-radius: 50%; 
          display: inline-block; 
          position: relative;
        }
        .status-dot::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: #10b981;
          border-radius: 50%;
          animation: pulse 1.8s infinite ease-in-out;
          top: 0;
          left: 0;
        }
        
        .main-content { 
          flex-grow: 1; 
          padding: 40px 48px; 
          overflow-y: auto; 
          display: flex; 
          flex-direction: column; 
          gap: 32px; 
          box-sizing: border-box;
          animation: fadeIn 0.4s ease-out;
        }
        .content-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          flex-wrap: wrap;
          gap: 16px;
        }
        .content-header h1 { 
          margin: 0; 
          font-size: 32px; 
          color: #0f172a; 
          font-weight: 800;
          letter-spacing: -0.75px;
        }
        .badge-connected { 
          background-color: #ecfdf5; 
          color: #059669; 
          padding: 8px 16px; 
          border-radius: 20px; 
          font-size: 13px; 
          font-weight: 700; 
          border: 1px solid #a7f3d0;
        }
        
        .form-giro { 
          display: flex; 
          flex-direction: column; 
          gap: 32px; 
          width: 100%;
          max-width: 1100px;
        }
        .cards-layout {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        
        .form-section { 
          background-color: white; 
          padding: 36px; 
          border-radius: 24px; 
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.03);
          display: flex; 
          flex-direction: column; 
          gap: 22px; 
          border: 1px solid #e2e8f0;
          border-top: 5px solid #2563eb; 
          box-sizing: border-box;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .form-section:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
        }
        .form-section h3 { 
          margin: 0; 
          color: #0f172a; 
          font-size: 19px; 
          font-weight: 700;
        }
        
        .input-group { 
          display: flex; 
          flex-direction: column; 
          gap: 8px; 
        }
        .input-group label { 
          font-size: 12px; 
          font-weight: 700; 
          color: #64748b;
          text-transform: uppercase;
        }
        .input-group input, .input-group select { 
          padding: 14px 16px; 
          border: 1.5px solid #e2e8f0; 
          border-radius: 12px; 
          font-size: 14px; 
          color: #334155; 
          outline: none; 
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .input-group input:focus, .input-group select:focus { 
          border-color: #2563eb; 
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
        }
        
        .form-footer { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          background-color: white; 
          padding: 32px 36px; 
          border-radius: 24px; 
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.03);
          border: 1px solid #e2e8f0;
          flex-wrap: wrap;
          gap: 24px;
          box-sizing: border-box;
        }
        .monto-box { 
          display: flex; 
          flex-direction: column; 
          gap: 8px; 
          width: 100%;
          max-width: 360px; 
        }
        .monto-box label { 
          font-size: 12px; 
          font-weight: 700; 
          color: #2563eb; 
          text-transform: uppercase;
        }
        .monto-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }
        .monto-prefix {
          position: absolute;
          left: 18px;
          font-weight: 800;
          color: #2563eb;
          font-size: 20px;
        }
        .monto-box input { 
          padding: 14px 16px 14px 54px; 
          border: 2px solid #e2e8f0; 
          border-radius: 14px; 
          font-size: 24px; 
          font-weight: 800; 
          color: #0f172a; 
          background-color: #f8fafc;
          width: 100%;
          box-sizing: border-box;
          outline: none;
        }
        
        .btn-submit { 
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: white; 
          border: none; 
          padding: 0 44px; 
          font-size: 16px; 
          font-weight: 700; 
          border-radius: 14px; 
          cursor: pointer; 
          transition: all 0.3s ease;
          height: 56px; 
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 180px;
        }
        .btn-submit:hover:not(:disabled) { 
          transform: translateY(-2px);
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
        }
        .btn-submit:disabled { 
          background: #cbd5e1; 
          color: #94a3b8;
          cursor: not-allowed; 
        }

        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          70% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .cards-layout { grid-template-columns: 1fr; gap: 24px; }
          .form-footer { flex-direction: column; align-items: stretch; }
          .monto-box { max-width: 100%; }
          .btn-submit { width: 100%; }
        }
        @media (max-width: 768px) {
          .app-container { flex-direction: column; overflow-y: auto; height: auto; }
          .sidebar { width: calc(100% - 32px); margin: 16px; height: auto; padding: 20px; }
          .menu-nav { flex-direction: row; margin-top: 20px; overflow-x: auto; }
          .menu-btn { white-space: nowrap; width: auto; }
          .user-profile { display: none; }
          .main-content { padding: 24px; }
        }
      `}</style>

      <div className="app-container">
        {/* Barra Lateral Premium */}
        <div className="sidebar">
          <div>
            <div className="logo-section">
              <img src="/logo.jpg" alt="SuperGiros" className="logo-img-branding" />
              <h2>SuperGiros</h2>
            </div>
            <nav className="menu-nav">
              <button type="button" className="menu-btn active">
                <span className="menu-icon-wrapper">＋</span>
                Emisión de Giros
              </button>
              <button type="button" className="menu-btn">
                <span className="menu-icon-wrapper">📋</span>
                Historial de Giros
              </button>
            </nav>
          </div>
          <div className="user-profile">
            <div className="avatar">A</div>
            <div>
              <p className="username">Administrador</p>
              <span className="status-online"><span className="status-dot"></span> Local Activo</span>
            </div>
          </div>
        </div>

        {/* Panel Central */}
        <main className="main-content">
          <header className="content-header">
            <h1>Portal de Ventanilla</h1>
            <span className="badge-connected">● Canales gRPC Operativos</span>
          </header>

          <form onSubmit={handleEmitirGiro} className="form-giro">
            <div className="cards-layout">
              
              {/* Tarjeta 1: Remitente */}
              <section className="form-section">
                <h3>👤 Datos del Remitente</h3>
                
                <div className="input-group">
                  <label>DNI Remitente</label>
                  <input 
                    type="text" 
                    value={remitente.dni} 
                    onChange={(e) => setRemitente({...remitente, dni: e.target.value})} 
                    onBlur={handleBuscarRemitente} 
                    required 
                  />
                </div>

                <div className="input-group">
                  <label>Nombres Completos</label>
                  <input type="text" value={remitente.nombres} onChange={(e) => setRemitente({...remitente, nombres: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Celular (WhatsApp)</label>
                  <input type="text" value={remitente.celular} onChange={(e) => setRemitente({...remitente, celular: e.target.value})} required />
                </div>
              </section>

              {/* Tarjeta 2: Destinatario */}
              <section className="form-section">
                <h3>📍 Destino del Giro</h3>
                <div className="input-group">
                  <label>DNI Beneficiario</label>
                  <input type="text" value={destinatario.dni} onChange={(e) => setDestinatario({...destinatario, dni: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Nombres del Beneficiario</label>
                  <input type="text" value={destinatario.nombres} onChange={(e) => setDestinatario({...destinatario, nombres: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Sucursal / Destino</label>
                  <select value={destinatario.sucursal} onChange={(e) => setDestinatario({...destinatario, sucursal: e.target.value})}>
                    <option value="Cusco Central">Cusco Central</option>
                    <option value="Santiago">Santiago</option>
                    <option value="Wanchaq">Wanchaq</option>
                    <option value="San Jerónimo">San Jerónimo</option>
                  </select>
                </div>
              </section>
            </div>

            {/* Caja de Importe Inferior */}
            <footer className="form-footer">
              <div className="monto-box">
                <label>Importe del Giro (S/.)</label>
                <div className="monto-input-container">
                  <span className="monto-prefix">S/.</span>
                  <input type="text" value={monto} onChange={(e) => setMonto(e.target.value)} required />
                </div>
              </div>
              <button type="submit" disabled={procesando} className="btn-submit">
                {procesando ? "Procesando..." : "Emitir Giro Seguro"}
              </button>
            </footer>
          </form>
        </main>
      </div>
    </>
  );
}

export default App;