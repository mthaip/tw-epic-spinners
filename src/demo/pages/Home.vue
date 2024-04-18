<template>
  <div class="page-container">
    <Navigation>
      <template #right>
        <div class="flex flex-row">
          <RouterLink
            to="/docs"
            class="ml-auto flex items-center text-end text-sm font-semibold transition-colors hover:text-violet-600 dark:text-white"
          >
            Docs
          </RouterLink>

          <RouterLink
            to="/playground"
            class="ml-auto flex items-center px-2 text-end text-sm font-semibold transition-colors hover:text-violet-600 dark:text-white"
          >
            Playground
          </RouterLink>
        </div>
      </template>
    </Navigation>

    <Gallery />
  </div>

  <Footer />
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

import Navigation from '../components/Navigation.vue';
import Footer from '../components/Footer.vue';
import Gallery from '../components/Gallery.vue';
</script>
