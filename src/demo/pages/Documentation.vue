<template>
  <Navigation />

  <Suspense>
    <Markdown
      class="container py-6"
      :raw="readme"
    />
  </Suspense>

  <Footer />
</template>

<script setup lang="ts">
import { Suspense } from 'vue';

import readme from '../../../README.md?raw';
import Footer from '../components/Footer.vue';
import Navigation from '../components/Navigation.vue';
import Markdown from '../components/Markdown.vue';
</script>
