import { useState} from 'react';

const NiubizPayment = ({ amount, purchaseNumber }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Credenciales de prueba públicas de Niubiz
  const merchantId = '450201653'; 
  const userNiubiz = 'integraciones.visanet@necomplus.com';
  const passwordNiubiz = 'd5e7nk$M';

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Generar Token de Seguridad
      const authString = btoa(`${userNiubiz}:${passwordNiubiz}`); // Codificación Base64
      
      const securityResponse = await fetch('/niubiz-api/api.security/v1/security', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${authString}`,
          'Accept': 'text/plain'
        }
      });

      if (!securityResponse.ok) throw new Error('Fallo al obtener token de seguridad');
      const securityToken = await securityResponse.text();

      // 2. Generar Token de Sesión
      const sessionPayload = {
        channel: 'web',
        amount: amount,
        antifraud: {
          clientIp: '127.0.0.1',
          merchantDefineData: { MDD4: 'test@supergiros.com', MDD32: 'DNI' }
        }
      };

      const sessionResponse = await fetch(`/niubiz-api/api.ecommerce/v2/ecommerce/token/session/${merchantId}`, {
        method: 'POST',
        headers: {
          'Authorization': securityToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sessionPayload)
      });

      if (!sessionResponse.ok) throw new Error('Fallo al obtener token de sesión');
      const sessionData = await sessionResponse.json();
      const sessionKey = sessionData.sessionKey;

      // 3. Cargar el script de Niubiz y abrir el modal
      const script = document.createElement('script');
      script.src = 'https://static-qa.niubiz.com.pe/pay-form/v2/js/step1.js';
      script.async = true;
      script.onload = () => {
        window.VisanetCheckout.configure({
          sessiontoken: sessionKey,
          channel: 'web',
          merchantid: merchantId,
          purchasenumber: purchaseNumber || Math.floor(Math.random() * 1000000).toString(),
          amount: amount,
          expirationminutes: '20',
          timeouturl: 'http://localhost:5173', 
          merchantlogo: 'https://tu-dominio.com/logo-supergiros.png', // Cambia por tu logo real luego
          formbuttoncolor: '#000000',
          action: 'http://localhost:5173/pago-completado', // A donde te redirige al terminar
          complete: function(params) {
            console.log('Pago exitoso de Niubiz:', params);
            alert('¡Pago completado con éxito!');
          }
        });
        window.VisanetCheckout.open();
        setLoading(false);
      };
      
      document.body.appendChild(script);

    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-sm bg-white mt-4">
      <h3 className="text-lg font-semibold mb-2">Completar Transferencia</h3>
      <p className="mb-4 text-gray-600">Total a pagar: <span className="font-bold text-black">S/ {amount}</span></p>
      
      {error && <p className="text-red-500 mb-2">{error}</p>}
      
      <button 
        onClick={handlePayment} 
        disabled={loading}
        className={`px-6 py-2 rounded text-white font-medium transition-colors ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Cargando pasarela...' : 'Pagar con Tarjeta (Niubiz)'}
      </button>
    </div>
  );
};

export default NiubizPayment;