<template>
  <UHeader>
    <template #left>
      <div class="flex shrink-0 items-center gap-2">
        <ULink to="/" aria-label="tw-epic-spinners" :active="route.path === '/'" class="inline-flex shrink-0 items-center whitespace-nowrap text-lg font-bold leading-none text-highlighted sm:text-xl">tw-<span class="text-primary">epic</span>-spinners</ULink>
        <UDropdownMenu :items="versions">
          <UButton :label="`v${pkg.version}`" trailing-icon="i-lucide-chevron-down" color="primary" variant="subtle" size="sm" aria-label="Select version" />
        </UDropdownMenu>
      </div>
    </template>
    <UNavigationMenu :items="items" />
    <template #right>
      <ThemePicker />
      <UButton to="https://github.com/mthaip/tw-epic-spinners" icon="i-lucide-github" class="hidden sm:inline-flex" color="neutral" variant="ghost" aria-label="GitHub" />
      <UButton to="https://www.npmjs.com/package/tw-epic-spinners" icon="i-simple-icons-npm" color="neutral" variant="ghost" aria-label="npm" />
    </template>
    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import pkg from '~~/../package.json';

const route = useRoute();
const items = [
  { label: 'Docs', to: '/docs' },
  { label: 'Lab', to: '/labs' },
];
const versions = [
  { label: `v${pkg.version}`, to: '/', icon: 'i-lucide-check' },
  { label: 'v1', to: 'https://tw-epic-spinners-v1.mthaip.com', external: true },
];
</script>
