<template>
  <div
    class="container my-8 grid grid-cols-2 items-center justify-items-center gap-10 max-sm:px-6 sm:grid-cols-3 md:mx-auto md:max-w-4xl md:grid-cols-4 lg:grid-cols-5"
  >
    <Preview
      v-for="spinner in spinners"
      @view-code="handleViewCode"
      :name="spinner"
    />
  </div>

  <dialog
    ref="previewModal"
    class="modal"
    @close="clipboardCode = initialClipboardCode"
  >
    <div class="modal-box">
      <div class="tabs tabs-lift">
        <input
          type="radio"
          name="spinner-code-preview"
          class="tab"
          aria-label="HTML"
          checked
        />
        <div class="tab-content bg-base-100 border-base-300 relative">
          <div
            class="prose"
            v-html="htmlContentRef"
          />
          <CopyToClipboard
            class="absolute top-2 right-2"
            :content="clipboardCode.html"
          />
        </div>

        <input
          type="radio"
          name="spinner-code-preview"
          class="tab"
          aria-label="Creator"
        />
        <div class="tab-content bg-base-100 border-base-300 relative">
          <div
            class="prose"
            v-html="creatorContentRef"
          />
          <CopyToClipboard
            class="absolute top-2 right-2"
            :content="clipboardCode.creator"
          />
        </div>
      </div>

      <form method="dialog">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
          >
            ✕
          </button>
        </form>
      </form>
    </div>

    <form
      method="dialog"
      class="modal-backdrop"
    >
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import DOMPurify from 'dompurify';
import { createHighlighter } from 'shiki';

import Preview from './Preview.vue';
import spinners from '../data/spinners';
import { codeHighlightTheme } from '../data/config';
import { type Spinner } from '../../index';
import CopyToClipboard from './CopyToClipboard.vue';

const initialClipboardCode = {
  html: '',
  creator: '',
};

const htmlContentRef = ref<string>('');
const creatorContentRef = ref<string>('');

const clipboardCode = ref<{ html: string; creator: string }>(
  initialClipboardCode,
);

const previewModal = ref<HTMLDialogElement | null>(null);

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

    htmlContentRef.value = highlighter.codeToHtml(sanitized, {
      lang: 'html',
      theme: codeHighlightTheme,
    });

    const creatorStr = `const innerHTMLContent = creator('${name}', '${spinnerClasses.join(' ')}');`;

    creatorContentRef.value = highlighter.codeToHtml(
      `// The returned HTML string can be directly used with \`v-html\` in Vue or \`dangerouslySetInnerHTML\` in React to render the spinner\n${creatorStr}`,
      {
        lang: 'typescript',
        theme: codeHighlightTheme,
      },
    );

    clipboardCode.value = {
      html: sanitized,
      creator: creatorStr,
    };

    previewModal.value?.showModal();
  } catch (error) {
    clipboardCode.value = initialClipboardCode;
  }
};
</script>
