<template>
  <div class="mx-auto max-w-4xl p-6 pb-16">
    <div class="mb-10 flex flex-row items-center justify-between">
      <RouterLink
        to="/"
        class="flex flex-row items-center gap-2 transition-colors hover:text-sky-600"
      >
        <span class="material-symbols-outlined"> keyboard_backspace </span>
        Home
      </RouterLink>

      <a
        class="ml-auto block"
        href="https://github.com/mthaip/tw-epic-spinners"
      >
        <Github class="h-6 w-6 text-sky-600 md:h-8 md:w-8" />
      </a>
    </div>
    <div
      class="markdown-body"
      v-html="markdown.render(readme)"
    />
  </div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import markdownItAnchor from 'markdown-it-anchor';
// import markdownItTocDoneRight from 'markdown-it-toc-done-right';

import readme from '../../../README.md?raw';
import Github from '../components/logos/Github.vue';

const markdown = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return '';
  },
  html: false,
  xhtmlOut: true,
  typographer: true,
}).use(markdownItAnchor, {
  permalink: markdownItAnchor.permalink.headerLink(),
  permalinkBefore: true,
  permalinkSymbol: '#',
});
// TODO: ToC - add [[toc]] in .md
// .use(markdownItTocDoneRight, {
//   callback: () => {
//     console.log('rendered');
//   },
// });
</script>

<style>
.markdown-body {
  @apply w-full bg-white text-black;

  & .table-of-contents {
    @apply fixed bottom-0 left-0 top-0 bg-white p-6 pr-8 shadow-xl;

    & > ol {
      @apply pl-0;
    }

    & li > a {
      @apply block w-full rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 hover:no-underline;
    }
  }

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply border-b-gray-300;
  }

  & * ol {
    @apply !list-none pl-4 text-black;
  }

  & ul {
    @apply list-disc;
  }

  & code {
    @apply bg-gray-300;
  }

  & a {
    @apply text-sky-600;

    &[class='header-anchor'] {
      @apply text-black;
    }
  }

  & pre {
    @apply bg-sky-50;

    & code {
      @apply text-gray-800;
    }
  }
}
</style>
