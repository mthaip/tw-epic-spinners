<template>
  <Navigation />

  <Suspense>
    <Gallery />
  </Suspense>

  <Footer />
</template>

<script setup lang="ts">
import Navigation from '../components/Navigation.vue';
import Footer from '../components/Footer.vue';
import Gallery from '../components/Gallery.vue';
import { Suspense } from 'vue';
</script>
