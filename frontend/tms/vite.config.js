import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // change this if your backend is on a different port
        changeOrigin: true,
        secure: false,
        // Optional: if you need to rewrite the path, uncomment the following line:
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
