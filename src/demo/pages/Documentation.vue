<template>
  <div class="mt-20">
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-3xl font-bold text-sky-600">Comming soon!</h1>
      <RouterLink
        to="/"
        class="flex-1 text-end transition-colors hover:text-sky-600 hover:underline"
        >Go back</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
