import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import postcss from 'autoprefixer';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin(),
    // Tailwind CSS  
    { postcss },
  ],
  build: {
    rollupOptions: {
      output: {
        format: 'es',
        entryFileNames: '[name].js',
      },
    },
  },
});