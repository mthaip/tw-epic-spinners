<template>
  <div class="mx-auto max-w-4xl p-6 pb-16">
    <div class="mb-10 flex flex-row items-center justify-between">
      <RouterLink
        to="/"
        class="flex flex-1 flex-row items-center gap-2 transition-colors hover:text-sky-600"
      >
        <span class="material-symbols-outlined"> keyboard_backspace </span>
        Home
      </RouterLink>

      <a
        class="block"
        href="https://github.com/mthaip/tw-epic-spinners"
      >
        <Github class="h-8 w-8 text-sky-600" />
      </a>
    </div>
    <div
      class="markdown-body"
      v-html="markdown.render(readme)"
    />
  </div>
</template>

<script setup lang="ts">
import readme from '../../../README.md?raw';
import Github from '../components/logos/Github.vue';

import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

const markdown = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return '';
  },
});
</script>

<style>
.markdown-body {
  @apply w-full bg-white text-black;

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply border-b-gray-300;
  }

  & ul {
    @apply list-disc;
  }

  & code {
    @apply bg-gray-300;
  }

  & a {
    @apply text-sky-600;
  }

  & pre {
    @apply bg-sky-50;

    & code {
      @apply text-gray-800;
    }
  }
}
</style>
