// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [], // Lista e moduleve që duhen externalizuar
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Sigurohu që këto janë të përfshira
  },
});