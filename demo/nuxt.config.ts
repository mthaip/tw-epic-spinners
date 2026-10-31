import mainPkgJson from '../package.json';
import presets from './app/data/theme-presets.json';
import { codeThemes } from './shared/code-theme';

export default defineNuxtConfig({
  devServer: {
    port: 3001,
  },

  app: {
    pageTransition: {
      mode: 'out-in',
      enterActiveClass: 'transition-opacity duration-200 ease-out motion-reduce:transition-none',
      enterFromClass: 'opacity-0',
      enterToClass: 'opacity-100',
      leaveActiveClass: 'transition-opacity duration-150 ease-in motion-reduce:transition-none',
      leaveFromClass: 'opacity-100',
      leaveToClass: 'opacity-0',
    },
  },

  // The script-free preview has an opaque origin and loads these public assets.
  routeRules: {
    '/_fonts/**': { headers: { 'Access-Control-Allow-Origin': '*' } },
    '/docs.md': {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Link': `<${mainPkgJson.homepage}/docs>; rel="canonical"`,
      },
    },
    '/playground': { redirect: { to: '/labs', statusCode: 301 } },
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/content',
  ],

  site: {
    url: mainPkgJson.homepage,
    name: mainPkgJson.name,
    description: mainPkgJson.description,
    defaultLocale: 'en',
  },

  sitemap: {
    xsl: false,
    // The Markdown source renders at /docs, not its Content path /documentation.
    excludeAppSources: ['@nuxt/content@v3:urls'],
    exclude: ['/playground', '/documentation'],
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: codeThemes,
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

  fonts: {
    families: [...new Set(presets.flatMap(({ font }) => [font.sans, 'serif' in font ? font.serif : undefined, 'mono' in font ? font.mono : undefined].filter((value): value is string => typeof value === 'string')))]
      .map((name) => ({ name, global: true, preload: false })),
    defaults: { weights: [400, 500, 600, 700, 800], styles: ['normal'], subsets: ['latin'] },
  },

  vite: {
    // Prebundle lazy editor dependencies together to avoid reloads during initialization.
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        'monaco-editor',
        'monaco-editor/features/iPadShowKeyboard/register',
        '@shikijs/monaco',
        'shiki/core',
        'shiki/engine/javascript',
        'shiki/langs/html.mjs',
        'shiki/themes/github-dark.mjs',
        'shiki/themes/material-theme-lighter.mjs',
        'prettier/standalone',
        'prettier/plugins/html',
        'tailwindcss',
        'tw-epic-spinners',
      ],
      rolldownOptions: { output: { minify: true } },
    },
  },

  devtools: { enabled: true },

  ssr: true,

  nitro: {
    preset: 'netlify',
    // Nuxt Fonts' development handler runs before Nitro route rules.
    devHandlers: [{
      route: '/_fonts',
      handler(event) {
        event.node.res.setHeader('Access-Control-Allow-Origin', '*');
      },
    }],
  },

  compatibilityDate: '2025-07-15',
});
