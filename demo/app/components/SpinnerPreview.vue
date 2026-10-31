<template>
  <div
    :class="`spinner-${name}`"
    aria-hidden="true"
  >
    <div
      v-for="item in count"
      :key="item"
      class="spinner-item"
    />
  </div>
</template>

<script setup lang="ts">
import type { SpinnerName } from '~/data/spinners';

defineProps<{
  name: SpinnerName;
  count: number;
}>();
</script>
