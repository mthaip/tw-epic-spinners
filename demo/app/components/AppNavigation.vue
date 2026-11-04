<template>
  <UHeader :ui="{ left: 'min-w-0', right: 'shrink-0' }">
    <template #left>
      <div class="flex min-w-0 items-center gap-2">
        <ULink to="/" aria-label="tw-epic-spinners" :active="route.path === '/'" class="inline-flex shrink-0 items-center whitespace-nowrap text-lg font-bold leading-none text-highlighted sm:text-xl">tw-<span class="text-primary">epic</span>-spinners</ULink>
        <UDropdownMenu :items="versions">
          <UButton :label="`v${pkg.version}`" trailing-icon="i-lucide-chevron-down" class="min-w-0" color="neutral" variant="subtle" size="sm" :aria-label="`v${pkg.version}, select version`" />
        </UDropdownMenu>
      </div>
    </template>
    <UNavigationMenu :items="items" />
    <template #right>
      <ThemePicker />
      <UButton
        v-for="link in externalLinks"
        :key="link.label"
        :to="link.to"
        :icon="link.icon"
        :aria-label="link.label"
        class="hidden lg:inline-flex"
        color="neutral"
        variant="ghost"
      />
    </template>
    <template #body>
      <UNavigationMenu :items="[items, externalLinks]" orientation="vertical" />
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
const externalLinks = [
  { label: 'GitHub', to: 'https://github.com/mthaip/tw-epic-spinners', icon: 'i-lucide-github' },
  { label: 'npm', to: 'https://www.npmjs.com/package/tw-epic-spinners', icon: 'i-simple-icons-npm' },
];
const versions = [
  { label: `v${pkg.version}`, to: '/', icon: 'i-lucide-check' },
  { label: 'v1', to: 'https://tw-epic-spinners-v1.mthaip.com', external: true },
];
</script>
