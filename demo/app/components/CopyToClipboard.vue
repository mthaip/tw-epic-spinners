<template>
  <UTooltip :text="copied ? 'Copied' : 'Copy'">
    <UButton
      :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
      :color="color"
      :variant="variant"
      :size="size"
      aria-label="Copy code"
      @click="copy(content)"
    />
  </UTooltip>
  <span role="status" class="sr-only">{{ copied ? 'Code copied' : '' }}</span>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import type { ButtonProps } from '@nuxt/ui';
withDefaults(defineProps<{
  content: string;
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
}>(), { color: 'primary', variant: undefined, size: undefined });
const { copy, copied } = useClipboard();
</script>
