import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import mdPlugin from 'vite-plugin-markdown';

// TODO
// const alias = Object.entries(tsConfig.compilerOptions.paths).reduce(([]));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  assetsInclude: ['**/*.md'],
  // TODO
  // resolve: {
  //   alias: {
  //     '~': path.resolve(__dirname, './src'),
  //   },
  // },
});
