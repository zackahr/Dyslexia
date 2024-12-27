import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Explicitly bind to 0.0.0.0 for Docker compatibility
    port: 8080,      // Desired port for the application
  },
})
