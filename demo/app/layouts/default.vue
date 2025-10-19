<template>
  <main class="bg-base-100 flex min-h-screen flex-col scroll-smooth">
    <AppNavigation />

    <Suspense>
      <section class="flex-1">
        <slot />
      </section>

      <template #fallback>
        <div
          class="inline-flex flex-1 items-center justify-center"
          v-html="creator('spinner-half-circle', 'spinner-size-16')"
        />
      </template>
    </Suspense>

    <AppFooter />
  </main>
</template>

<script setup lang="ts">
import type { MetaObject } from 'nuxt/schema';
import { creator } from '../../../src/index';
import { routes } from '~/data/routes';

const route = useRoute();

const updateSeoMeta = (path: string) => {
  const baseHead: MetaObject = {
    title: 'Tailwind Epic Spinners',
    htmlAttrs: { lang: 'en-US' },
    meta: [{ name: 'robots', content: 'index, follow' }],
  };

  const matchRouteData = routes.find((r) => r.path === path);

  if (matchRouteData?.meta.title) {
    baseHead.title = matchRouteData.meta.title;
  }

  if (matchRouteData?.meta.description) {
    baseHead.meta?.push({
      name: 'description',
      content: matchRouteData.meta.description,
    });
  }

  useSeoMeta(baseHead);
};

watch(route, (newRoute) => {
  updateSeoMeta(newRoute.path);
});

updateSeoMeta(route.path);
</script>
