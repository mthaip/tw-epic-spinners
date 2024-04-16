import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, '../src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
  },
});
