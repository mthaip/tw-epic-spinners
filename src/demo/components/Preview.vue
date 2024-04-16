<template>
  <div
    @click="$emit('view-code', code?.innerHTML || '')"
    class="group flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4 p-4 transition-all duration-300 hover:scale-110 hover:rounded-xl hover:bg-sky-600 hover:shadow-xl"
  >
    <div
      ref="code"
      class="flex flex-1 items-center justify-center group-hover:!text-white"
    >
      <slot />
    </div>
    <span class="mt-auto text-center text-sm group-hover:text-white">
      <code>{{ name }}</code>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  name: string;
}>();

const code = ref<HTMLElement | null>(null);
</script>
