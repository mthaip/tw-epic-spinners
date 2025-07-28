<template>
  <Navigation />

  <Suspense>
    <Markdown
      class="container py-6"
      :raw="readme"
    />

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

import readme from '../../../README.md?raw';
import Footer from '../components/Footer.vue';
import Navigation from '../components/Navigation.vue';
import Markdown from '../components/Markdown.vue';

import { creator } from '../../index';
</script>
