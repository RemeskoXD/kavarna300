import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Načte proměnné prostředí z .env souborů. 
  // Třetí parametr '' zajistí načtení všech proměnných, nejen těch s prefixem VITE_
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react() as any],
    server: {
      // Host: true povolí naslouchání na všech IP adresách (důležité pro Docker/Cloud)
      host: true,
      port: 3000,
      strictPort: true,
      hmr: {
        overlay: true,
      },
    },
    resolve: {
      alias: {
        '@': '/',
      },
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        input: {
          main: 'index.html',
        },
      },
    },
    // Předání environment proměnných do aplikace (např. pro Google AI SDK)
    define: {
      'process.env': env
    },
  };
});