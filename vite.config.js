import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    commonjs() // Convierte los 'require' de gRPC para que el navegador los entienda
  ],
  server: {
    proxy: {
      '/niubiz-api': {
        // 🔥 CAMBIO CRÍTICO: Apuntamos al Sandbox oficial de Niubiz 
        // para que coincida con el entorno del script de pago.
        target: 'https://apisandbox.vnforappstest.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/niubiz-api/, '')
      }
    }
  },
  // 🔥 ESTO OBLIGA A VITE A TRADUCIR PROTOBUF
  optimizeDeps: {
    include: ['google-protobuf']
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
})