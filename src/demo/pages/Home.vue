<template>
  <div>
    <div class="mx-auto flex max-w-4xl items-center justify-between p-6">
      <div class="flex flex-1">
        <a
          href="https://github.com/mthaip/tw-epic-spinners"
          class="mr-auto"
        >
          <Github class="h-8 w-8 text-sky-600" />
        </a>
      </div>
      <div class="flex flex-col items-center justify-center gap-3">
        <h1 class="text-4xl font-bold text-sky-600">Epic Spinners</h1>
        <div class="flex flex-row items-center justify-center gap-2">
          <span class="text-gray-80 text-nowrap font-light"> Plugin for </span>
          <img
            :src="tailwindLogo"
            alt="tailwindcss logo"
            class="h-4"
          />
        </div>
      </div>
      <div class="flex flex-1">
        <RouterLink
          to="/docs"
          class="ml-auto text-end transition-colors hover:text-sky-600 hover:underline"
        >
          Get started
        </RouterLink>
      </div>
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
import tailwindLogo from '../assets/images/tailwindcss-logotype.svg';
</script>
