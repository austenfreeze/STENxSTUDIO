import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'



export default defineConfig({
  plugins: [react(), tsconfigPaths()], 
 server: {
    port: 3333,
    strictPort: true,
  },
  optimizeDeps: {
    include: ["@sanity/ui", "@sanity/visual-editing"],
  },
});
