<template>
  <div>
    <div class="mx-auto flex max-w-4xl items-center justify-between py-6">
      <a
        href="https://github.com/mthaip"
        class="flex-1"
      >
        <Github class="h-8 w-8 text-sky-600" />
      </a>
      <div class="flex flex-col items-center justify-center gap-2">
        <h1 class="text-4xl font-bold text-sky-600">Epic Spinners</h1>
        <span class="text-lg font-light text-gray-800">
          tailwindcss Integration
        </span>
      </div>
      <RouterLink
        to="/docs"
        class="flex-1 text-end transition-colors hover:text-sky-600 hover:underline"
      >
        Get started
      </RouterLink>
    </div>
    <Gallery />
    <footer class="flex w-full items-center bg-black p-6 text-white">
      <span class="mx-auto"> mthaip © 2024 </span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Gallery from '../components/Gallery.vue';
import Github from '../components/logos/Github.vue';
</script>
