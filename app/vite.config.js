import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { host: true, allowedHosts: true, proxy: { '/api': { target: 'http://localhost:8790', changeOrigin: true } } },
  preview: { host: true, allowedHosts: true },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pricing: resolve(__dirname, 'pricing/index.html'),
        agent: resolve(__dirname, 'agent/index.html'),
        managedOpenclaw: resolve(__dirname, 'managed-openclaw/index.html'),
        managedHermesAgent: resolve(__dirname, 'managed-hermes-agent/index.html'),
      },
    },
  },
});
