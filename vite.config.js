// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Replace <repo-name> with your actual GitHub repo name:
  base: '/southeast-ins/',
  plugins: [react()],
});
