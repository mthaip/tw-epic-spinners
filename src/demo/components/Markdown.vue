<template>
  <div
    class="prose"
    v-html="markdown.render(raw)"
  />
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import { createHighlighter } from 'shiki';
import markdownItAnchor from 'markdown-it-anchor';
// import markdownItTocDoneRight from 'markdown-it-toc-done-right';

defineProps<{ raw: string }>();

// `createHighlighter` is async, it initializes the internal and
// loads the themes and languages specified.
const highlighter = await createHighlighter({
  themes: ['tokyo-night'],
  langs: ['html', 'typescript', 'bash', 'vue', 'vue-html', 'tsx'],
});

// Set up markdown-it with shiki for syntax highlighting
const markdown = new MarkdownIt({
  highlight: (code, lang) => {
    lang = lang || 'text';
    return highlighter.codeToHtml(code, { lang, theme: 'tokyo-night' });
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
