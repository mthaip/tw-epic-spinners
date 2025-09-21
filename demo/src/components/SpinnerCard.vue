<template>
  <div
    @click="
      $emit('view-code', name, spinnerHTML?.innerHTML || '', getClasses(name))
    "
    class="group hover:bg-primary flex aspect-3/4 h-full w-full cursor-pointer flex-col items-center justify-center gap-4 px-2 py-3 transition-all duration-300 hover:scale-110 hover:rounded-xl hover:shadow-xl"
  >
    <div
      ref="spinnerHTML"
      class="text-primary group-hover:text-primary-content flex flex-1 items-center justify-center"
      v-html="creator(name, getClasses(name))"
    />
    <span
      class="text-primary group-hover:text-primary-content mt-auto text-center text-xs sm:text-sm"
    >
      <code>{{ name }}</code>
    </span>
  </div>
</template>

<script setup lang="ts">
import { creator, type Spinner } from 'tw-epic-spinners';
import { ref } from 'vue';

defineProps<{
  name: Spinner;
}>();

defineEmits<{
  'view-code': [name: Spinner, html: string, classes: string[]];
}>();

const spinnerHTML = ref<HTMLElement | null>(null);

// ! List all classes to ensure tailwindcss can scan all of them
const getClasses = (name: Spinner): string[] => {
  switch (name) {
    case 'spinner-hollow-dots':
    case 'spinner-circles-to-rhombuses':
    case 'spinner-looping-rhombuses':
      return ['spinner-size-3', 'spinner-duration-[2.5s]'];
    case 'spinner-flower':
    case 'spinner-pixel':
    case 'spinner-orbit':
    case 'spinner-radar':
    case 'spinner-scaling-squares':
    case 'spinner-half-circle':
    case 'spinner-trinity-rings':
    case 'spinner-fulfilling-square':
    case 'spinner-semipolar':
    case 'spinner-self-building-square':
    case 'spinner-swapping-squares':
    case 'spinner-fulfilling-bouncing-circle':
    case 'spinner-fingerprint':
    case 'spinner-spring':
    case 'spinner-atom':
    case 'spinner-breeding-rhombus':
      return ['spinner-size-12 sm:spinner-size-16', 'spinner-duration-[2.5s]'];
    default:
      return [];
  }
};
</script>
