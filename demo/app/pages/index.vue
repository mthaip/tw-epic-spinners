<template>
  <div>
    <UPageHero
      orientation="horizontal"
      description="Start with a baseline, add or remove items, and make it your own."
      :links="links"
    >
      <template #headline>
        <UButton :label="`What's new in v${pkg.version}`" to="/docs#composable-approach" trailing-icon="i-lucide-arrow-right" color="neutral" variant="soft" size="sm" />
      </template>
      <template #title>
        Composable spinner plugin<br>
        <span class="text-primary">for Tailwind CSS</span>
      </template>
      <HeroDemo />
    </UPageHero>

    <UContainer id="collections" class="scroll-mt-20">
      <UPage>
        <UPageBody>
          <SpinnersGallery />
        </UPageBody>
      </UPage>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';
import pkg from '~~/../package.json';
const links: ButtonProps[] = [
  { label: 'Get started', to: '/docs#installation', color: 'neutral', variant: 'solid', size: 'lg' },
  { label: 'Explore 20 spinners', to: '#collections', color: 'neutral', variant: 'soft', size: 'lg' },
];
</script>
