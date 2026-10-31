<template>
  <UModal v-model:open="open" :title="`spinner-${name}`" :ui="{ content: 'sm:max-w-3xl' }">
    <template #body>
      <DocsCodeBlock :code="code" language="html" :meta="`spinner=${name}`" :ui="{ base: 'pe-36' }">
        <CodeHighlight :code="code" />
      </DocsCodeBlock>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { SpinnerName } from '~/data/spinners';

const open = defineModel<boolean>('open', { default: false });
defineProps<{ code: string; name: SpinnerName }>();
</script>
