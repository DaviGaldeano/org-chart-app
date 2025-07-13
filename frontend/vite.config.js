import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // redireciona chamadas para /api para o backend Rails na porta 3000
      '/api': 'http://localhost:3000',
    },
  },
})
