<template>
  <Html :data-theme="theme">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Html>
</template>

<script setup lang="ts">
import useTheme from '~/composable/useTheme';

const theme = useTheme();
</script>
