<template>
  <div :data-previews-paused="previewsPaused || undefined">
    <UPageHero
      orientation="horizontal"
      description="tw-epic-spinners is a Tailwind CSS v3 and v4 plugin with 20 composable CSS loading spinners inspired by EpicMax’s Epic Spinners. Add or remove HTML parts to customize each design."
      :links="links"
    >
      <template #headline>
        <UButton :label="`What's new in v${pkg.version}`" to="/docs#composable-approach" trailing-icon="i-lucide-arrow-right" color="neutral" variant="soft" size="sm" />
      </template>
      <template #title>
        Epic Spinners for Tailwind CSS
      </template>
      <HeroDemo :paused="previewsPaused" />
    </UPageHero>

    <UContainer id="collections" class="scroll-mt-20">
      <UPage>
        <UPageBody>
          <section aria-labelledby="spinner-collection-heading" class="space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h2 id="spinner-collection-heading" class="text-2xl font-semibold text-highlighted">
                CSS spinner collection
              </h2>
              <UButton
                label="Pause preview animations"
                color="neutral"
                :variant="previewsPaused ? 'solid' : 'outline'"
                :aria-pressed="previewsPaused"
                @click="previewsPaused = !previewsPaused"
              />
            </div>
            <p>
              Select a spinner to view its HTML, or browse all
              <ULink to="/docs#baseline-spinners" class="font-medium underline">20 spinner markup examples</ULink>
              in the documentation.
            </p>
            <SpinnersGallery />
          </section>
        </UPageBody>
      </UPage>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';
import pkg from '~~/../package.json';
const previewsPaused = ref(false);
const links: ButtonProps[] = [
  { label: 'Get started', to: '/docs#installation', color: 'neutral', variant: 'solid', size: 'lg' },
  { label: 'Explore 20 spinners', to: '#collections', color: 'neutral', variant: 'soft', size: 'lg' },
];
</script>
