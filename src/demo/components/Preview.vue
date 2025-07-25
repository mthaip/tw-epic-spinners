<template>
  <div
    @click="$emit('view-code', code?.innerHTML || '')"
    class="group flex aspect-3/4 h-full w-full cursor-pointer flex-col items-center justify-center gap-4 px-2 py-3 transition-all duration-300 hover:scale-110 hover:rounded-xl hover:bg-violet-600 hover:shadow-xl"
  >
    <div
      ref="code"
      class="flex flex-1 items-center justify-center group-hover:text-white!"
      v-html="creator(name, getClasses(name))"
    />
    <span
      class="mt-auto text-center text-xs group-hover:text-white sm:text-sm dark:text-white"
    >
      <code>{{ name }}</code>
    </span>
  </div>
</template>

<script setup lang="ts">
import { creator, type Spinner } from '../../index.ts';
import { ref } from 'vue';

defineProps<{
  name: Spinner;
}>();

const code = ref<HTMLElement | null>(null);

const getClasses = (name: Spinner) => {
  if (
    ['hollow-dots', 'circles-to-rhombuses', 'looping-rhombuses'].includes(name)
  ) {
    return ['spinner-size-3', 'spinner-duration-[2.5s]'];
  }

  return ['spinner-size-12 sm:spinner-size-16', 'spinner-duration-[2.5s]'];
};
</script>
