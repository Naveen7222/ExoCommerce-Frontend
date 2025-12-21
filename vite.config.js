import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   base: '/exocommerce/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/products': {
        target: 'http://localhost:8080',
      },
    },
    historyApiFallback: true, 
  },
})
