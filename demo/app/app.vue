<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import useThemeFavicon from '~/composable/useThemeFavicon';
useThemeFavicon();
</script>
