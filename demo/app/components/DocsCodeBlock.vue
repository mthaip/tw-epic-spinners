<template>
  <div ref="container" class="relative my-5 @container">
    <ProsePre v-bind="{ ...$attrs, ...props }" :copy="spinner ? false : props.copy" :ui="{ ...props.ui, root: 'my-0', ...(spinner ? { base: props.ui?.base ?? 'pt-14 @4xl:pt-3' } : {}) }">
      <slot />
    </ProsePre>
    <div v-if="spinner" class="absolute end-3 top-3 flex items-center gap-2">
      <CopyToClipboard v-if="props.copy" :content="source" color="neutral" variant="outline" size="sm" />
      <UButton :to="{ path: '/labs', query: { spinner } }" label="Open in Lab" :aria-label="`Open in Lab: spinner-${spinner}`" color="neutral" variant="outline" size="sm" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProsePre from '@nuxt/ui/components/prose/Pre.vue';
import type { ProsePreProps } from '@nuxt/ui/components/prose/Pre.vue';
import spinners from '~/data/spinners';

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<ProsePreProps>(), { copy: true });
const container = useTemplateRef<HTMLElement>('container');
const source = computed(() => props.code || container.value?.querySelector('pre')?.textContent || '');
const spinner = computed(() => {
  const name = /(?:^|\s)spinner=([a-z-]+)(?:\s|$)/.exec(props.meta ?? '')?.[1];
  return spinners.find((spinner) => spinner.name === name)?.name;
});
</script>
