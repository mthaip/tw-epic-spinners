import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// TODO
// const alias = Object.entries(tsConfig.compilerOptions.paths).reduce(([]));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // TODO
  // resolve: {
  //   alias: {
  //     '~': path.resolve(__dirname, './src'),
  //   },
  // },
});
