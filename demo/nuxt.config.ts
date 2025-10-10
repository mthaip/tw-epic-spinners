import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/content'],

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'tokyo-night',
          langs: [
            'html',
            'typescript',
            'javascript',
            'bash',
            'vue',
            'vue-html',
            'tsx',
            'css',
          ],
        },
        toc: {
          depth: 4,
        },
      },
    },
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  devtools: { enabled: true },

  nitro: {
    preset: 'netlify',
  },

  compatibilityDate: '2025-07-15',
});
