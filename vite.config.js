// vite.config.js (project root)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react()
    // (no need to list tailwindcss here if postcss.config.js is correct)
  ],
});
