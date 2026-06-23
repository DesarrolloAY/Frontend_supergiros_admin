import { useState } from 'react';
import HistorialGiros from './HistorialGiros'; // Ajusta la ruta si es necesario
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { executeGrpcCall, transactionClient } from '../services/grpcClient';

// IMPORTANTE: Asegurar que los tipos comunes también se carguen en el scope ANTES que Transaction_pb.js
import "../Protos/Common_pb.js"; 
import "../Protos/Transaction_pb.js";

// CONTROL GLOBAL gRPC
const TransactionPb = window.proto.Protos || window.proto;

// === Función impura fuera del ciclo de vida de React ===
const generateOrderNumber = () => {
  return Math.floor(Math.random() * 1000000).toString();
};

export const TransactionForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    dniRemitente: '', nombresRemitente: '', celularRemitente: '',
    dniDestinatario: '', nombresDestinatario: '', sedeDestino: 'Sede Central',
    monto: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [vistaActual, setVistaActual] = useState('emision'); 
  
  const getUserRole = () => {
    const token = sessionStorage.getItem('sg_token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    } catch {
      return null;
    }
  };

  const userRole = getUserRole();

  const handleNumericInput = (e, field, maxLength) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= maxLength) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleCurrencyInput = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, ''); 
    const parts = value.split('.');
    if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
    setFormData({ ...formData, monto: value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const montoParseado = parseFloat(formData.monto);
  const montoValido = isNaN(montoParseado) ? 0 : montoParseado;
  const comision = montoValido * 0.05;
  const total = montoValido + comision;

  const openConfirmationFlow = (e) => {
    e.preventDefault();

    if (formData.dniRemitente.length !== 8 || formData.dniDestinatario.length !== 8) {
      return Swal.fire({ icon: 'warning', title: 'Validación', text: 'Los DNI deben tener exactamente 8 dígitos.', confirmButtonColor: '#2563eb' });
    }
    if (montoValido <= 0) {
      return Swal.fire({ icon: 'warning', title: 'Monto inválido', text: 'El monto debe ser mayor a S/ 0.00', confirmButtonColor: '#2563eb' });
    }

    setPaymentMethod('cash');
    setModalStep(1);
    setIsModalOpen(true);
  };

  // ------------------------------------------------------------------
  // LÓGICA DE INFRAESTRUCTURA (gRPC Backend)
  // ------------------------------------------------------------------
  const executeBackendTransaction = async (opNiubiz = null) => {
    console.log("🟢 FASE 4: Ejecutando gRPC hacia el backend. OP Niubiz:", opNiubiz);
    try {
      const request = new TransactionPb.CreateTransactionRequest();

      request.setAccountid(parseInt(formData.dniRemitente, 10));
      request.setMonto(montoValido);
      request.setSede(formData.sedeDestino);
      request.setTipomovimiento(1); 
      request.setMoneda("PEN");
      
      const baseDesc = "Pago vía: " + getPaymentChannelName();
      request.setDescripcion(opNiubiz ? `${baseDesc} | OP: ${opNiubiz}` : baseDesc);

      const timestamp = new window.proto.google.protobuf.Timestamp();
      timestamp.fromDate(new Date());
      request.setFecharealizacion(timestamp);

      await executeGrpcCall(transactionClient.createTransaction, request);
      console.log("✅ FASE 4 EXITOSA: gRPC respondió 200 OK");

      Swal.fire({
        icon: 'success',
        title: '¡Operación Exitosa!',
        text: `El giro por S/ ${montoValido.toFixed(2)} se ha enviado a la cola de procesamiento.`,
        confirmButtonColor: '#2563eb',
        customClass: { popup: 'rounded-3xl' }
      });

      setFormData({
        dniRemitente: '', nombresRemitente: '', celularRemitente: '',
        dniDestinatario: '', nombresDestinatario: '', sedeDestino: 'Sede Central', monto: ''
      });

    } catch (error) {
      console.error("❌ FASE 4 FALLÓ. Error en gRPC:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error en Infraestructura',
        text: 'La llamada gRPC falló. Revisa el backend.',
        confirmButtonColor: '#ef4444',
        customClass: { popup: 'rounded-3xl' }
      });
    }
  };

  // ------------------------------------------------------------------
  // LÓGICA DE NIUBIZ CON TRAZABILIDAD (DEBUG)
  // ------------------------------------------------------------------
  const processNiubizPayment = async (montoFinal) => {
    setIsLoading(true);
    // 🔥 FIX: Credenciales oficiales del Sandbox moderno de Niubiz
    const merchantId = '456879852'; // Código exclusivo para pruebas en Soles
    const userNiubiz = 'integraciones@niubiz.com.pe'; 
    const passwordNiubiz = '_7z3@8fF'; 
    
    const randomOrderNumber = generateOrderNumber();

    try {
      console.log("🟢 FASE 1: Solicitando Token de Seguridad...");
      const authString = btoa(`${userNiubiz}:${passwordNiubiz}`);
      const securityRes = await fetch('/niubiz-api/api.security/v1/security', {
        method: 'GET',
        headers: { 'Authorization': `Basic ${authString}`, 'Accept': 'text/plain' }
      });

      const securityToken = (await securityRes.text()).trim().replace(/"/g, '');
      
      console.log("🟢 FASE 2: Creando Sesión...");
      
      // 🔥 FIX: Forzamos el monto a float con 2 decimales explícitos
      const amountFloat = parseFloat(montoFinal);
      
      const sessionPayload = {
        channel: 'web',
        amount: amountFloat,
        antifraud: {
          // 🔥 FIX: Simulamos una IP pública peruana. NUNCA envíes 127.0.0.1
          clientIp: '190.237.10.12', 
          merchantDefineData: { 
            MDD4: 'test@supergiros.com', 
            MDD32: formData.dniRemitente || '12345678' 
          }
        }
      };

      const sessionRes = await fetch(`/niubiz-api/api.ecommerce/v2/ecommerce/token/session/${merchantId}`, {
        method: 'POST',
        headers: { 'Authorization': securityToken, 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionPayload)
      });

      if (!sessionRes.ok) throw new Error(await sessionRes.text());
      const sessionData = await sessionRes.json();
      
      console.log("🟢 FASE 3: Inyectando Modal...");
      const script = document.createElement('script');
      
      // 🔥 Regresamos a la URL oficial del PDF que SÍ carga
      script.src = 'https://static-content-qas.vnforapps.com/env/sandbox/js/checkout.js';
      script.async = true;

      script.onload = () => {
        console.log("✅ FASE 3: Script cargado. Configurando VisanetCheckout...");
        
        try {
          if (window.VisanetCheckout) {
            
            // 📡 EL RADAR: Escuchamos directamente al iframe por si el SDK se congela
            // 📡 EL RADAR DEFINITIVO: Cazador de Éxitos
            window.addEventListener('message', async (event) => {
              if (!event.data) return;
              
              try {
                // Convertimos el mensaje crudo (string) en un objeto JavaScript
                const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
                
                // Si el iframe grita "complete", ¡entramos en acción!
                if (data.method === 'complete' && data.args && data.args.length > 0) {
                  console.log("⚡ ¡ÉXITO DETECTADO POR EL RADAR!", data);
                  
                  // Extraemos el código de operación real de Visa
                  const transactionToken = data.args[0].token || 'OK_RADAR';
                  
                  // 1. Destruimos el iframe de Visa congelado a la fuerza
                  const visanetOverlay = document.getElementById('visanetCheckout');
                  if (visanetOverlay) visanetOverlay.style.display = 'none';
                  
                  // 2. Limpiamos el estado de carga
                  setIsLoading(false);
                  
                  // 3. ¡Disparamos tu backend para guardar el giro!
                  await executeBackendTransaction(transactionToken);
                }
              } catch{
                // Ignoramos la basura o mensajes de extensiones del navegador que no sean JSON
              }
            });

            window.VisanetCheckout.configure({
              sessiontoken: sessionData.sessionKey,
              merchantid: merchantId,
              purchasenumber: randomOrderNumber,
              amount: amountFloat, 
              channel: 'web',
              action: 'javascript:void(0);', 
              timeouturl: window.location.origin, 
              merchantlogo: 'https://cdn-icons-png.flaticon.com/512/5717/5717515.png', 
              formbuttoncolor: '#2563eb',
              
              complete: async function(params) {
                console.log('🎉 PAGO COMPLETADO (Vía Callback). Params:', params);
                const numOperacion = params.dataMap?.TRACE_NUMBER || 'OK';
                await executeBackendTransaction(numOperacion);
                setIsLoading(false);
              },
              error: function(err) {
                console.error("❌ ERROR DEL MODAL VISA:", err);
                setIsLoading(false);
              }
            });

            setTimeout(() => {
              console.log("🟢 Abriendo modal ahora...");
              window.VisanetCheckout.open();
              setIsModalOpen(false); 
            }, 500);
          }
        } catch (e) {
          console.error("❌ ERROR FATAL:", e);
        }
      };
      
      document.body.appendChild(script);

    } catch (error) {
      console.error("🚨 ERROR:", error);
      setIsLoading(false);
      Swal.fire({ icon: 'error', title: 'Error de Pasarela', text: 'Error en la sesión de pago.' });
    }
  };

  // ------------------------------------------------------------------
  // ORQUESTADOR DE CONFIRMACIÓN
  // ------------------------------------------------------------------
  const handleFinalConfirm = async () => {
    const montoCalculado = parseFloat(total.toFixed(2));

    if (paymentMethod === 'card') {
      await processNiubizPayment(montoCalculado);
    } else {
      setIsLoading(true);
      await executeBackendTransaction();
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('sg_token');
    navigate('/');
  };

  const getPaymentChannelName = () => {
    if (paymentMethod === 'telegram') return 'n8n ➔ Telegram';
    if (paymentMethod === 'card') return 'Niubiz ➔ Card';
    return 'Caja ➔ Efectivo';
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800 relative">
      
      {/* SIDEBAR BANCARIO */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl relative z-20">
        <div className="p-8 flex items-center gap-4 border-b border-slate-800/50">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <i className="fa-solid fa-money-bill-transfer text-white text-lg"></i>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Super<span className="text-blue-500">Giros</span></h1>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Operaciones</p>
          <button 
            onClick={() => setVistaActual('emision')}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-semibold transition-all ${
              vistaActual === 'emision' 
              ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20 shadow-inner' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
            }`}
          >
            <i className="fa-solid fa-money-bill-wave w-5 text-center"></i>
            Emisión de Giros
          </button>

          {/* Botón de Historial */}
          <button 
            onClick={() => setVistaActual('historial')}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-semibold transition-all ${
              vistaActual === 'historial' 
              ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20 shadow-inner' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
            }`}
          >
            <i className="fa-solid fa-clock-rotate-left w-5 text-center"></i>
            Historial de Giros
          </button>
        </nav>

        <div className="p-6 border-t border-slate-800/50 bg-slate-900/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300">
              <i className="fa-solid fa-user-shield"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-200">Admin</span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> En línea
              </span>
            </div>
          </div>
          <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all" title="Cerrar Sesión">
            <i className="fa-solid fa-right-from-bracket text-lg"></i>
          </button>
        </div>
      </aside>

      {/* ÁREA DE TRABAJO */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-10 py-5 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Nueva Transacción</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">Complete los datos para procesar el giro</p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-bold text-emerald-700 tracking-wide">gRPC Conectado</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 pb-32">
          {vistaActual === 'emision' ? (
            <form onSubmit={openConfirmationFlow} className="max-w-6xl mx-auto space-y-8">
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Remitente */}
                <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl">
                      <i className="fa-solid fa-user-tie"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">Datos del Remitente</h3>
                      <p className="text-sm text-slate-500">Información de quien envía</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">DNI Remitente</label>
                      <input type="text" name="dniRemitente" value={formData.dniRemitente} onChange={(e) => handleNumericInput(e, 'dniRemitente', 8)} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all outline-none font-mono text-lg tracking-widest text-slate-700" placeholder="12345678" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Nombres Completos</label>
                      <input type="text" name="nombresRemitente" value={formData.nombresRemitente} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all outline-none text-slate-700 font-medium" placeholder="Ej. Juan Pérez" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Celular</label>
                      <input type="text" name="celularRemitente" value={formData.celularRemitente} onChange={(e) => handleNumericInput(e, 'celularRemitente', 9)} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all outline-none font-mono text-lg tracking-widest text-slate-700" placeholder="987654321" required />
                    </div>
                  </div>
                </div>

                {/* Destinatario */}
                <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">Destino del Giro</h3>
                      <p className="text-sm text-slate-500">Información de quien recibe</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">DNI Beneficiario</label>
                      <input type="text" name="dniDestinatario" value={formData.dniDestinatario} onChange={(e) => handleNumericInput(e, 'dniDestinatario', 8)} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none font-mono text-lg tracking-widest text-slate-700" placeholder="87654321" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Nombres Beneficiario</label>
                      <input type="text" name="nombresDestinatario" value={formData.nombresDestinatario} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none text-slate-700 font-medium" placeholder="Ej. María López" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Agencia de Retiro</label>
                      <select name="sedeDestino" value={formData.sedeDestino} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none text-slate-700 font-medium cursor-pointer appearance-none">
                        <option value="Sede Central">Sede Central - Cusco</option>
                        <option value="Sucursal Norte">Sucursal Norte</option>
                        <option value="Sucursal Sur">Sucursal Sur</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Barra Inferior Fija de Totales */}
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-8 fixed bottom-6 left-[20rem] right-10 z-10">
                <div className="flex flex-wrap items-center gap-8 md:gap-16 w-full lg:w-auto">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Importe a Enviar</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xl">S/</span>
                      <input type="text" name="monto" value={formData.monto} onChange={handleCurrencyInput} className="w-40 pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-2xl font-black text-slate-800 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" placeholder="0.00" required />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Comisión (5%)</span>
                    <span className="text-xl font-bold text-slate-600">S/ {comision.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col pl-6 border-l-2 border-slate-100">
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">Total a Pagar</span>
                    <span className="text-4xl font-black text-slate-800 tracking-tight">S/ {total.toFixed(2)}</span>
                  </div>
                </div>

                {userRole === 'Admin' ? (
                  <button type="submit" className="w-full lg:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 text-lg flex items-center justify-center gap-3">
                    <i className="fa-solid fa-paper-plane"></i>
                    Registrar Transacción
                  </button>
                ) : (
                  <div className="w-full lg:w-auto px-8 py-4 bg-amber-50 border border-amber-200 text-amber-700 font-bold rounded-2xl flex items-center justify-center gap-3 shadow-inner">
                    <i className="fa-solid fa-lock"></i>
                    Modo Lectura (Sin Privilegios)
                  </div>
                )}
              </div>

            </form>
          ) : (
            <div className="max-w-6xl mx-auto">
              <HistorialGiros />
            </div>
          )}
        </div>
      </main>

      {/* ================= MODAL INTERACTIVO ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-100 transition-all transform duration-300 scale-100">
            
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Paso {modalStep} de 2</span>
                <h3 className="text-xl font-black text-slate-800 mt-2">
                  {modalStep === 1 ? 'Seleccione Método de Pago' : 'Confirmación Bancaria'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-50 transition-all">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            {/* PASO 1 */}
            {modalStep === 1 && (
              <div className="space-y-4">
                <p className="text-sm text-slate-500 font-medium mb-2">¿Cómo desea procesar el pago de este giro?</p>
                
                <div className="grid grid-cols-1 gap-3">
                  <div 
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between group ${paymentMethod === 'cash' ? 'border-emerald-500 bg-emerald-50/40 shadow-md shadow-emerald-500/5' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-colors ${paymentMethod === 'cash' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-emerald-500 group-hover:bg-slate-200'}`}>
                        <i className="fa-solid fa-money-bill-1-wave"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Pago en Efectivo</h4>
                        <span className="text-xs text-emerald-600 font-semibold bg-emerald-100/60 px-2 py-0.5 rounded">Liquidación en caja física</span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cash' ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'}`}>
                      {paymentMethod === 'cash' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </div>

                  <div 
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between group ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50/40 shadow-md shadow-blue-500/5' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-colors ${paymentMethod === 'card' ? 'bg-[#ff5a00] text-white' : 'bg-slate-100 text-[#ff5a00] group-hover:bg-slate-200'}`}>
                        <i className="fa-solid fa-credit-card"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Pasarela de Tarjetas</h4>
                        <span className="text-xs text-[#ff5a00] font-semibold bg-[#ff5a00]/10 px-2 py-0.5 rounded">Niubiz / POS</span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-500' : 'border-slate-300'}`}>
                      {paymentMethod === 'card' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </div>

                  <div 
                    onClick={() => setPaymentMethod('telegram')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between group ${paymentMethod === 'telegram' ? 'border-blue-500 bg-blue-50/40 shadow-md shadow-blue-500/5' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-colors ${paymentMethod === 'telegram' ? 'bg-[#0088cc] text-white' : 'bg-slate-100 text-[#0088cc] group-hover:bg-slate-200'}`}>
                        <i className="fa-brands fa-telegram"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Telegram Bot API</h4>
                        <span className="text-xs text-blue-600 font-semibold bg-blue-100/60 px-2 py-0.5 rounded">Notificación vía n8n</span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'telegram' ? 'border-blue-500 bg-blue-500' : 'border-slate-300'}`}>
                      {paymentMethod === 'telegram' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button type="button" onClick={() => setModalStep(2)} className="px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition-all shadow-md shadow-slate-900/10">
                    Continuar <i className="fa-solid fa-chevron-right ml-1"></i>
                  </button>
                </div>
              </div>
            )}

            {/* PASO 2 */}
            {modalStep === 2 && (
              <div className="space-y-5">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 space-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-200/50 pb-2">
                    <span className="text-slate-400 font-medium">Remitente:</span>
                    <span className="font-bold text-slate-700">{formData.nombresRemitente} ({formData.dniRemitente})</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/50 pb-2">
                    <span className="text-slate-400 font-medium">Beneficiario:</span>
                    <span className="font-bold text-slate-700">{formData.nombresDestinatario} ({formData.dniDestinatario})</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/50 pb-2">
                    <span className="text-slate-400 font-medium">Agencia Destino:</span>
                    <span className="font-bold text-slate-700">{formData.sedeDestino}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/50 pb-2">
                    <span className="text-slate-400 font-medium">Canal de Pago:</span>
                    <span className="font-bold text-blue-600 uppercase tracking-wider text-xs">
                      {getPaymentChannelName()}
                    </span>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-500 font-medium">Importe del Giro:</span>
                      <span className="font-bold text-slate-700">S/ {montoValido.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-500 font-medium">Comisión (5%):</span>
                      <span className="font-bold text-slate-700">S/ {comision.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-200 text-base">
                      <span className="text-slate-800 font-bold">Total a Despachar:</span>
                      <span className="font-black text-emerald-600">S/ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-2 py-1">
                  <p className="text-base font-extrabold text-slate-800">¿Está seguro de la operación?</p>
                  <p className="text-xs text-slate-400">
                    {paymentMethod === 'card' 
                      ? 'Se abrirá la pasarela de Niubiz para procesar el cargo.' 
                      : 'Esta acción inyectará la entidad inmediatamente en el clúster local.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <button type="button" disabled={isLoading} onClick={() => setModalStep(1)} className="px-4 py-3 text-slate-500 hover:text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all">
                    <i className="fa-solid fa-chevron-left mr-1"></i> Atrás
                  </button>
                  <button type="button" disabled={isLoading} onClick={handleFinalConfirm} className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
                    {isLoading ? (
                      <><i className="fa-solid fa-circle-notch fa-spin"></i> Procesando...</>
                    ) : (
                      <><i className="fa-solid fa-check"></i> Sí, Confirmar y Enviar</>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};