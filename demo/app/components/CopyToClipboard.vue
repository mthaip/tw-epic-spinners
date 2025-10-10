<template>
  <div
    v-if="isSupported"
    class="tooltip tooltip-accent tooltip-left"
    :data-tip="copied ? 'Copied' : 'Copy'"
  >
    <button
      class="btn btn-square"
      @click="() => copy(props.content)"
    >
      <span class="icon-[lucide--clipboard]" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

const props = defineProps<{ content: string }>();

const { copy, copied, isSupported } = useClipboard();
</script>
