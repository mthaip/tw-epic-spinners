<template>
  <div
    v-if="isSupported"
    class="tooltip tooltip-accent tooltip-left"
    :data-tip="copied ? 'Copied' : 'Copy'"
  >
    <button
      @click="() => copy(props.content)"
      class="btn btn-square"
    >
      <span class="material-symbols-outlined"> content_copy </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

const props = defineProps<{ content: string }>();

const { copy, copied, isSupported } = useClipboard();
</script>
