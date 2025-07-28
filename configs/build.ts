import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pkg from '../package.json';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, '../src/index.ts'),
      name: pkg.name,
      formats: ['es', 'umd'],
      fileName: 'index',
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
  plugins: [
    dts({
      entryRoot: 'src',
      exclude: ['src/demo/**/*'],
      copyDtsFiles: true,
    }),
  ],
});
