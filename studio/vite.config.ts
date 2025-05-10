import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3333,
    strictPort: true,
  },
  optimizeDeps: {
    include: ["@sanity/ui", "@sanity/visual-editing"],
  },
});
