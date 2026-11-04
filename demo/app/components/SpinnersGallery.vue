<template>
  <UPageGrid class="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    <SpinnerCard
      v-for="spinner in spinners"
      :key="spinner.name"
      :spinner="spinner"
      :disabled="!ready"
      @view-code="showCode"
    />
    <CodePreviewModal
      v-model:open="open"
      :code="code"
      :name="name"
      @close-auto-focus="restoreFocus"
    />
  </UPageGrid>
</template>

<script setup lang="ts">
import spinners from '~/data/spinners';
import useCodePreview from '~/composable/useCodePreview';
const { open, code, name, showCode, restoreFocus } = useCodePreview();
const ready = ref(false);
onMounted(() => { ready.value = true; });
</script>
