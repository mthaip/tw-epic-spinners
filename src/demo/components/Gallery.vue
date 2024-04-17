<template>
  <div
    class="my-16 grid grid-cols-2 items-center justify-items-center gap-10 px-6 text-violet-600 sm:grid-cols-3 md:mx-auto md:max-w-4xl md:grid-cols-4 lg:grid-cols-5 dark:text-white"
  >
    <Preview
      @view-code="handleViewCode"
      name="flower"
    >
      <!-- spinner-flower" -->
      <div
        class="spinner-flower"
        :class="classes"
      >
        <div class="shape">
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="pixel"
    >
      <!-- spinner-pixel -->
      <div
        class="spinner-pixel"
        :class="classes"
      >
        <div class="shape"></div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="hollow-dots"
    >
      <!-- spinner-hollow-dots -->
      <div
        class="spinner-size-3 spinner-hollow-dots"
        :class="{ 'spinner-duration-[2.5s]': hasCustomDuration }"
      >
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="intersecting-circles"
    >
      <!-- spinner-intersecting-circles -->
      <div
        class="spinner-intersecting-circles"
        :class="classes"
      >
        <div class="shape-container">
          <span class="shape"></span>
          <span class="shape"></span>
          <span class="shape"></span>
          <span class="shape"></span>
          <span class="shape"></span>
          <span class="shape"></span>
          <span class="shape"></span>
        </div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="orbit"
    >
      <!-- spinner-orbit -->
      <div
        class="spinner-orbit"
        :class="classes"
      >
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="radar"
    >
      <!-- spinner-radar -->
      <div
        class="spinner-radar"
        :class="classes"
      >
        <div class="shape">
          <div>
            <div></div>
          </div>
        </div>
        <div class="shape">
          <div>
            <div></div>
          </div>
        </div>
        <div class="shape">
          <div>
            <div></div>
          </div>
        </div>
        <div class="shape">
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="scaling-squares"
    >
      <!-- spinner-scaling-squares -->
      <div
        class="spinner-scaling-squares"
        :class="classes"
      >
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="half-circle"
    >
      <!-- spinner-half-circle -->
      <div
        class="spinner-half-circle"
        :class="classes"
      >
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="trinity-rings"
    >
      <!-- spinner-trinity-rings -->
      <div
        class="spinner-trinity-rings"
        :class="classes"
      >
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="fulfilling-square"
    >
      <!-- spinner-fulfilling-square -->
      <div
        class="spinner-fulfilling-square"
        :class="classes"
      >
        <div class="shape"></div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="circles-to-rhombuses"
    >
      <!-- spinner-circles-to-rhombuses -->
      <div
        class="spinner-size-3 spinner-circles-to-rhombuses"
        :class="{ 'spinner-duration-[2.5s]': hasCustomDuration }"
      >
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="semipolar"
    >
      <!-- spinner-semipolar -->
      <div
        class="spinner-semipolar"
        :class="classes"
      >
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="self-building-square"
    >
      <!-- spinner-self-building-square -->
      <div
        class="spinner-self-building-square"
        :class="classes"
      >
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape clear"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape clear"></div>
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="swapping-squares"
    >
      <!-- spinner-swapping-squares -->
      <div
        class="spinner-swapping-squares"
        :class="classes"
      >
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="fulfilling-bouncing-circle"
    >
      <!-- spinner-fulfilling-bouncing-circle -->
      <div
        class="spinner-fulfilling-bouncing-circle"
        :class="classes"
      >
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="fingerprint"
    >
      <!-- spinner-fingerprint -->
      <div
        class="spinner-fingerprint"
        :class="classes"
      >
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="spring"
    >
      <!-- spinner-spring -->
      <div
        class="spinner-spring"
        :class="classes"
      >
        <div class="shape">
          <div></div>
        </div>
        <div class="shape">
          <div></div>
        </div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="atom"
    >
      <!-- spinner-atom -->
      <div
        class="spinner-atom"
        :class="classes"
      >
        <div class="shape">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="looping-rhombuses"
    >
      <!-- spinner-looping-rhombuses -->
      <div
        class="spinner-size-3 spinner-looping-rhombuses"
        :class="{ 'spinner-duration-[2.5s]': hasCustomDuration }"
      >
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
    </Preview>

    <Preview
      @view-code="handleViewCode"
      name="breeding-rhombus"
    >
      <!-- spinner-breeding-rhombus -->
      <div class="spinner-breeding-rhombus">
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
    </Preview>
  </div>

  <Transition name="slide-fade">
    <div
      class="fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center bg-white/30 backdrop-blur-sm"
      v-if="!!previewCode"
    >
      <button
        class="absolute right-5 top-5 flex items-center justify-center rounded-lg border bg-white p-2 transition-colors hover:bg-red-600 hover:text-white"
        @click="previewCode = ''"
      >
        <span class="material-symbols-outlined"> close </span>
      </button>
      <div
        class="relative mx-auto max-w-2xl rounded-xl border bg-white px-4 pt-0 text-sm shadow-xl"
      >
        <button
          class="absolute right-2 top-2 flex items-center justify-center rounded-lg border bg-white p-2 transition-colors hover:bg-gray-100"
          @click="handleCopyCode"
        >
          <span class="material-symbols-outlined"> content_copy </span>
        </button>
        <pre class="h-full overflow-y-auto pr-16">
          <code class="language-html" v-html="getPreviewCode()" />
        </pre>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useClipboard } from '@vueuse/core';
import Preview from './Preview.vue';
import hljs from 'highlight.js';
import esthetic from 'esthetic';

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
    previewCode.value = `\n${esthetic.format(codeData)}`;
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

const hasCustomSize = ref(true);
const hasCustomDuration = ref(true);

const classes = {
  'spinner-size-12 sm:spinner-size-16': hasCustomSize.value,
  'spinner-duration-[2.5s]': hasCustomDuration.value,
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
