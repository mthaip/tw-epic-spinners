<template>
  <UCard :ui="{ body: 'p-0 sm:p-0' }">
    <div class="flex min-w-0 flex-col md:flex-row md:items-center md:justify-between">
      <pre class="min-h-96 w-full min-w-0 max-w-full md:w-3/5 md:flex-none overflow-x-auto rounded-t-lg bg-muted p-6 text-left text-xs leading-6 md:rounded-none md:rounded-l-lg"><CodeHighlight :code="markup" :highlight-line="5 + count" animate-lines /></pre>
      <div class="grid aspect-video w-full shrink-0 self-center place-items-center p-6 md:mx-auto md:aspect-3/4 md:max-w-[30%] md:p-0" aria-label="Live flower spinner demo">
        <SpinnerPreview name="flower" :count="count" class="spinner-size-32 spinner-duration-3500 text-primary" />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { useDocumentVisibility, useIntervalFn, usePreferredReducedMotion } from '@vueuse/core';

const count = ref(4);
const markup = computed(() => `<div
  class="spinner-flower spinner-size-32
    spinner-duration-3500 text-primary"
  aria-hidden="true"
>
${Array.from({ length: count.value }, () => '  <div class="spinner-item"></div>').join('\n')}
</div>`);
const visibility = useDocumentVisibility();
const reducedMotion = usePreferredReducedMotion();
let direction = 1;
const { pause, resume } = useIntervalFn(() => {
  if (count.value === 8) direction = -1;
  if (count.value === 4) direction = 1;
  count.value += direction;
}, 1800, { immediate: false });

onMounted(() => {
  watch([reducedMotion, visibility], ([motion, visible]) => {
    if (motion !== 'reduce' && visible === 'visible') resume();
    else pause();
  }, { immediate: true });
});
</script>
