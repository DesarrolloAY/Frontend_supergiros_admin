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
    // 🔥 EL PROXY DE NIUBIZ QUE HABÍAMOS CREADO (NO LO BORRES)
    proxy: {
      '/niubiz-api': {
        target: 'https://apitestenv.vnforapps.com',
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