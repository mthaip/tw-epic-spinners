import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import tsConfig from './tsconfig.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      'tw-epic-spinners/index': path.resolve(
        __dirname,
        tsConfig.compilerOptions.paths['tw-epic-spinners/index'][0],
      ),
    },
  },
});
