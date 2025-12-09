import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react-icons/fa', 'react-icons'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4242',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      'react-icons/fa': 'react-icons/fa',
    },
  },
});
