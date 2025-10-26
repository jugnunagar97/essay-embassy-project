import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react-icons/fa', 'react-icons'],
  },
  resolve: {
    alias: {
      'react-icons/fa': 'react-icons/fa',
    },
  },
});
