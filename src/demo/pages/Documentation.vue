<template>
  <div class="page-container">
    <Navigation>
      <template #right>
        <div class="flex flex-row">
          <RouterLink
            to="/playground"
            class="ml-auto flex items-center px-2 text-end text-sm font-semibold transition-colors hover:text-violet-600 dark:text-white"
          >
            Playground
          </RouterLink>
        </div>
      </template>
    </Navigation>

    <div
      class="markdown-body"
      v-html="markdown.render(readme)"
    />
  </div>

  <Footer />
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import markdownItAnchor from 'markdown-it-anchor';
// import markdownItTocDoneRight from 'markdown-it-toc-done-right';

import readme from '../../../README.md?raw';
import Footer from '../components/Footer.vue';
import Navigation from '../components/Navigation.vue';

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
  @apply w-full bg-transparent text-black  dark:text-gray-50;

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
    @apply bg-gray-300 dark:bg-gray-600;
  }

  & a {
    @apply text-violet-600;

    &[class='header-anchor'] {
      @apply text-black dark:text-gray-50;
    }
  }

  & pre {
    @apply bg-gray-100 dark:bg-gray-800;

    & code {
      @apply text-gray-800 dark:text-gray-50;

      & span {
        &.hljs-name {
          @apply dark:text-green-500;
        }

        &.hljs-attr {
          @apply dark:text-blue-600;
        }

        &.hljs-string {
          @apply dark:text-blue-400;
        }
      }
    }
  }
}
</style>
