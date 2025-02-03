import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    }
  },
  plugins: [react()],
  preview: {
    port: process.env.PORT || 3000,  // Bind to Render's port
    host: '0.0.0.0'                  // Accept connections from Render
  }
})
