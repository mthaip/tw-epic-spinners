<template>
  <div
    class="container grid grid-cols-2 items-center justify-items-center gap-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
  >
    <SpinnerCard
      v-for="spinner in spinners"
      @view-code="handleViewCode"
      :name="`spinner-${spinner}`"
    />
  </div>

  <CodePreviewModal
    :id="previewModalId"
    :html="htmlRef"
    :creator="creatorRef"
    @close="resetPreviewData"
  />
</template>

<script setup lang="ts">
import { ref, useId } from 'vue';

import DOMPurify from 'dompurify';
import { createHighlighter } from 'shiki';

import SpinnerCard from './SpinnerCard.vue';
import CodePreviewModal, { type CodePreviewData } from './CodePreviewModal.vue';

import spinners from '../data/spinners';
import { codeHighlightTheme } from '../data/config';

import { type Spinner } from '../../../src/index.ts';

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

const handleViewCode = (
  name: Spinner,
  spinnerHTML: string,
  spinnerClasses: string[],
) => {
  try {
    const sanitized = DOMPurify.sanitize(spinnerHTML, {
      ALLOWED_ATTR: ['class'],
      ALLOWED_TAGS: ['div', 'span'],
      USE_PROFILES: { html: true },
      ALLOW_DATA_ATTR: false,
      SAFE_FOR_TEMPLATES: true,
    });

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
  } catch (error) {
    resetPreviewData();
  }
};
</script>
