<template>
  <UPageGrid class="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    <SpinnerCard
      v-for="spinner in spinners"
      :key="spinner.name"
      :spinner="spinner"
      @view-code="showCode"
    />
    <CodePreviewModal
      v-model:open="open"
      :code="code"
      :name="name"
    />
  </UPageGrid>
</template>

<script setup lang="ts">
import spinners from '~/data/spinners';
import useCodePreview from '~/composable/useCodePreview';
const { open, code, name, showCode } = useCodePreview();
</script>
