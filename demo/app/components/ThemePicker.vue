<template>
  <UPopover>
    <UButton icon="i-lucide-palette" color="neutral" variant="ghost" aria-label="Theme settings" />
    <template #content>
      <div class="grid w-64 gap-4 p-4">
        <UFormField label="Theme">
          <USelect v-model="selected" :items="items" aria-label="Theme preset" class="w-full" />
        </UFormField>
        <UFormField label="Appearance">
          <UColorModeSelect aria-label="Appearance" class="w-full" />
        </UFormField>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
// Precompiled exports from the Nuxt UI 4.12 theme studio, with its MIT license.
// Keep Lucide as this app's icon collection; all visual theme settings are stock.
import allPresets from '~/data/theme-presets.json';

const presets = allPresets.filter(({ id }) => id !== 'default');

const items = presets.map(({ id, name }) => ({ label: name, value: id }));
const selected = useCookie('spinner-theme-preset', { default: () => 'iris', maxAge: 31536000 });
if (!presets.some(({ id }) => id === selected.value)) selected.value = 'iris';
const preset = computed(() => presets.find(({ id }) => id === selected.value)!);
const appConfig = useAppConfig();
const config = appConfig.ui as Record<string, unknown>;
const components = [...new Set(presets.flatMap(({ ui }) => Object.keys(ui)).filter((key) => key !== 'colors'))];
const defaults = Object.fromEntries(components.map((key) => [key, structuredClone(toRaw(config[key] ?? {}))]));

watch(preset, ({ ui }) => {
  const theme = ui as Record<string, unknown>;
  for (const key of components) config[key] = theme[key] ?? defaults[key];
  config.colors = { ...ui.colors };
}, { immediate: true });

useHead(() => ({
  style: [{ id: 'spinner-theme-preset', key: 'spinner-theme-preset', innerHTML: preset.value.css }],
}));
</script>
