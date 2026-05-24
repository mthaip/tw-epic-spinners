<!-- cSpell:words dompurify -->
<template>
  <div
    class="container grid grid-cols-2 items-center justify-items-center gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
  >
    <SpinnerCard
      v-for="spinner in spinners"
      :key="spinner"
      :name="`spinner-${spinner}`"
      @view-code="handleViewCode"
    />

    <CodePreviewModal
      :id="previewModalId"
      :html="htmlRef"
      :creator="creatorRef"
      @close="resetPreviewData"
    />
  </div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify';
// Installed by @nuxt/content
import { createHighlighter } from 'shiki';

import spinners from '~/data/spinners';
import { codeHighlightTheme } from '~/data/config';

import type { Spinner } from 'tw-epic-spinners';
import type { CodePreviewData } from '~/components/CodePreviewModal.vue';

const previewModalId = useId();

const initialPreviewData: CodePreviewData = {
  preview: '',
  code: '',
};

const htmlRef = ref<CodePreviewData>(initialPreviewData);
const creatorRef = ref<CodePreviewData>(initialPreviewData);

const resetPreviewData = () => {
  htmlRef.value = initialPreviewData;
  creatorRef.value = initialPreviewData;
};

const highlighter = await createHighlighter({
  themes: [codeHighlightTheme],
  langs: ['html', 'typescript'],
});

const prettify = (root: ParentNode, depth = 0): string => {
  const indent = '  ';
  return Array.from(root.children)
    .map((el) => {
      const pad = indent.repeat(depth);
      const opening = el.outerHTML.slice(0, el.outerHTML.indexOf('>') + 1);
      const closing = `</${el.tagName.toLowerCase()}>`;
      if (!el.children.length) return `${pad}${opening}${closing}`;
      return `${pad}${opening}\n${prettify(el, depth + 1)}\n${pad}${closing}`;
    })
    .join('\n');
};

const handleViewCode = (
  name: Spinner,
  spinnerHTML: string,
  spinnerClasses: string[],
) => {
  try {
    const cleanFragment = DOMPurify.sanitize(spinnerHTML, {
      ALLOWED_ATTR: ['class'],
      ALLOWED_TAGS: ['div', 'span'],
      USE_PROFILES: { html: true },
      ALLOW_DATA_ATTR: false,
      SAFE_FOR_TEMPLATES: true,
      RETURN_DOM_FRAGMENT: true,
    });
    const sanitized = prettify(cleanFragment);

    htmlRef.value = {
      preview: highlighter.codeToHtml(sanitized, {
        lang: 'html',
        theme: codeHighlightTheme,
      }),
      code: sanitized,
    };

    const creatorStr = `const innerHTMLContent = creator('${name}', '${spinnerClasses.join(' ')}');`;

    creatorRef.value = {
      preview: highlighter.codeToHtml(
        `// The returned HTML string can be directly used with \`v-html\` in Vue or \`dangerouslySetInnerHTML\` in React to render the spinner\n${creatorStr}`,
        {
          lang: 'typescript',
          theme: codeHighlightTheme,
        },
      ),
      code: creatorStr,
    };

    (document.getElementById(previewModalId) as HTMLDialogElement)?.showModal();
  } catch {
    resetPreviewData();
  }
};
</script>
