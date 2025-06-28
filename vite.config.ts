import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['@babel/plugin-syntax-decimal']
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react', 'aframe'],
  },
});