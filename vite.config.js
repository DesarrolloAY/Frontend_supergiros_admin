import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs' // 🔴 Importamos el plugin

export default defineConfig({
  plugins: [
    react(), 
    commonjs() // 🔴 Lo activamos aquí
  ],
})