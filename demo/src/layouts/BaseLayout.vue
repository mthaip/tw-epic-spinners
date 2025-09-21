<template>
  <Navigation />

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

  <Footer />
</template>

<script setup lang="ts">
import { Suspense } from 'vue';
import { useHead } from '@unhead/vue';

import Navigation from '../components/Navigation.vue';
import Footer from '../components/Footer.vue';

import { creator } from 'tw-epic-spinners';
import { useRoute } from 'vue-router';

const route = useRoute();

const baseHead = {
  title: 'Tailwind Epic Spinners',
  htmlAttrs: { lang: 'en-US' },
  meta: [{ name: 'robots', content: 'index, follow' }],
};

if (route.meta.title) {
  baseHead.title = route.meta.title as string;
}

if (route.meta.description) {
  baseHead.meta.push({
    name: 'description',
    content: route.meta.description as string,
  });
}

useHead(baseHead);
</script>
