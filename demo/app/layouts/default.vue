<template>
  <div class="flex flex-col" :class="route.path === '/labs' ? 'h-dvh' : 'min-h-dvh'">
    <AppNavigation class="shrink-0" />
    <UMain class="flex min-h-0 flex-1 flex-col">
      <slot />
    </UMain>
    <AppFooter class="shrink-0" />
  </div>
</template>

<script setup lang="ts">
import { routes } from '~/data/routes';
import pkg from '~~/../package.json';

const route = useRoute();
const metadata = computed(() => routes.find(({ path }) => path === route.path)?.meta);
// Spinner selection and tracking queries share the page's canonical URL.
const canonical = computed(() => new URL(route.path.replace(/\/+$/, '') || '/', pkg.homepage).href);
const image = new URL('/social-card.png', pkg.homepage).href;

useSeoMeta({
  title: () => metadata.value?.title ?? pkg.name,
  description: () => metadata.value?.description,
  ogTitle: () => metadata.value?.title ?? pkg.name,
  ogDescription: () => metadata.value?.description,
  ogUrl: () => canonical.value,
  ogSiteName: pkg.name,
  ogType: 'website',
  ogLocale: 'en_US',
  ogImage: image,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'tw-epic-spinners v2: 20 composable pure-CSS spinners for Tailwind CSS v3 and v4',
  twitterCard: 'summary_large_image',
  twitterTitle: () => metadata.value?.title ?? pkg.name,
  twitterDescription: () => metadata.value?.description,
  twitterImage: image,
  twitterImageAlt: 'tw-epic-spinners v2: composable spinners for Tailwind CSS',
});

// Nuxt Robots owns indexing directives so development and previews stay noindex.
useHead(() => ({
  htmlAttrs: { lang: 'en', class: 'scroll-smooth motion-reduce:scroll-auto' },
  link: [
    { rel: 'canonical', href: canonical.value },
    { rel: 'alternate', type: 'text/plain', title: 'LLM guide', href: new URL('/llms.txt', pkg.homepage).href },
    ...(route.path === '/docs' ? [{ rel: 'alternate' as const, type: 'text/markdown', title: 'v2 documentation as Markdown', href: new URL('/docs.md', pkg.homepage).href }] : []),
  ],
  script: [{
    key: 'project-schema',
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite', '@id': `${pkg.homepage}/#website`,
          url: pkg.homepage, name: pkg.name, description: pkg.description, inLanguage: 'en',
        },
        {
          '@type': 'SoftwareSourceCode', '@id': `${pkg.homepage}/#software`,
          name: pkg.name, description: pkg.description, version: pkg.version,
          url: pkg.homepage, codeRepository: pkg.url,
          license: 'https://spdx.org/licenses/MIT.html',
          programmingLanguage: ['CSS', 'TypeScript'],
          runtimePlatform: 'Tailwind CSS v3 or v4; browsers supporting sibling-index() and sibling-count()',
          author: { '@type': 'Person', name: 'mthaip', url: 'https://mthaip.com/' },
          sameAs: ['https://www.npmjs.com/package/tw-epic-spinners'],
        },
        {
          '@type': 'WebPage', '@id': `${canonical.value}#webpage`,
          url: canonical.value, name: metadata.value?.title, description: metadata.value?.description,
          inLanguage: 'en', isPartOf: { '@id': `${pkg.homepage}/#website` },
          about: { '@id': `${pkg.homepage}/#software` },
        },
      ],
    }).replaceAll('<', '\\u003c'),
  }],
}));
</script>
