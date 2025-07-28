<template>
  <Navigation />

  <Suspense>
    <Gallery />

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

import Navigation from '../components/Navigation.vue';
import Footer from '../components/Footer.vue';
import Gallery from '../components/Gallery.vue';

import { creator } from '../../index';
</script>
