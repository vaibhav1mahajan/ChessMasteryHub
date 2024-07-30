// vite.config.js or vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',  // Allows access from local network
    port: 3000,       // You can change the port if needed
  },
});
