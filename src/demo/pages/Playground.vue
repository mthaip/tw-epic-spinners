<template>
  <div class="page-container">
    <Navigation>
      <template #right>
        <div class="flex flex-row">
          <RouterLink
            to="/docs"
            class="ml-auto flex items-center px-2 text-end text-sm font-semibold transition-colors hover:text-violet-600 dark:text-white"
          >
            Docs
          </RouterLink>
        </div>
      </template>
    </Navigation>
  </div>

  <div class="text-white">My playground</div>

  <Footer />
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

import Navigation from '../components/Navigation.vue';
import Footer from '../components/Footer.vue';
</script>
