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

const route = useRoute();
const metadata = computed(() => routes.find(({ path }) => path === route.path)?.meta);

useHead({ htmlAttrs: { lang: 'en-US', class: 'scroll-smooth motion-reduce:scroll-auto' } });
useSeoMeta({
  title: () => metadata.value?.title ?? 'Tailwind Epic Spinners',
  description: () => metadata.value?.description,
  robots: 'index, follow',
});
</script>
