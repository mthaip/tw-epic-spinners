<template>
  <div
    class="mb-16 grid grid-cols-2 items-center justify-items-center gap-10 px-6 text-violet-600 sm:grid-cols-3 md:mx-auto md:max-w-4xl md:grid-cols-4 lg:grid-cols-5 dark:text-white"
  >
    <Preview
      v-for="spinner in spinners"
      @view-code="handleViewCode"
      :name="spinner.name"
    >
      <component
        :is="spinner.component"
        :class="getClasses(spinner.name)"
      />
    </Preview>
  </div>

  <Transition name="slide-fade">
    <div
      class="fixed bottom-0 left-0 right-0 top-0 z-20 flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm"
      v-if="!!previewCode"
    >
      <div class="w-full sm:w-fit">
        <button
          class="mb-2 ml-auto flex items-center justify-center rounded-lg border bg-white p-1 transition-colors hover:border-transparent hover:bg-red-600 hover:text-white"
          @click="previewCode = ''"
        >
          <span class="material-symbols-outlined"> close </span>
        </button>
        <div
          class="relative mx-auto max-w-2xl rounded-xl border bg-white px-4 pt-0 text-sm shadow-xl dark:bg-gray-300"
        >
          <button
            class="absolute right-2 top-2 flex items-center justify-center rounded-lg border bg-white p-2 transition-colors hover:bg-gray-100"
            @click="handleCopyCode"
          >
            <span class="material-symbols-outlined"> content_copy </span>
          </button>
          <pre class="w-full overflow-y-auto pr-16">
          <code class="language-html " v-html="getPreviewCode()" />
        </pre>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useClipboard } from '@vueuse/core';

import hljs from 'highlight.js';
import esthetic from 'esthetic';
import DOMPurify from 'dompurify';

import Preview from './Preview.vue';
import spinners from './spinners/index.ts';

const previewCode = ref<string>('');

const { copy } = useClipboard({
  source: previewCode,
});

const handleCopyCode = () => {
  copy(previewCode.value);
  setTimeout(() => {
    previewCode.value = '';
  }, 350);
};

const handleViewCode = (codeData: string) => {
  try {
    const sanitized = DOMPurify.sanitize(codeData, {
      ALLOWED_ATTR: ['class'],
      ALLOWED_TAGS: ['div', 'span'],
      USE_PROFILES: { html: true },
      ALLOW_DATA_ATTR: false,
      SAFE_FOR_TEMPLATES: true,
    });
    previewCode.value = `\n${esthetic.format(sanitized)}`;
  } catch (error) {
    previewCode.value = '';
  }
};

const getPreviewCode = () => {
  if (!previewCode.value) {
    return '';
  }
  return hljs.highlight(previewCode.value, {
    language: 'html',
  }).value;
};

const getClasses = (name: string) => {
  if (
    ['hollow-dots', 'circles-to-rhombuses', 'looping-rhombuses'].includes(name)
  ) {
    return ['spinner-size-3', 'spinner-duration-[2.5s]'];
  }

  return ['spinner-size-12 sm:spinner-size-16', 'spinner-duration-[2.5s]'];
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 350ms ease-out;
}

.slide-fade-leave-active {
  transition: all 250ms cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
