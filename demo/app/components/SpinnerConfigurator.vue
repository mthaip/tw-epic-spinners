<template>
  <div class="container">
    <div class="flex flex-col gap-4 md:flex-row md:items-end">
      <div>
        <label
          :for="spinnerSelectId"
          class="mb-2 block font-mono text-sm"
        >
          spinner-*
        </label>
        <select
          :id="spinnerSelectId"
          class="select w-full"
          @change="
            selectedSpinner =
              (`spinner-${($event.target as HTMLSelectElement)?.value}` as Spinner) ||
              undefined
          "
        >
          <option
            v-for="spinner in spinners"
            :key="spinner"
            :value="spinner"
            :selected="`spinner-${spinner}` === selectedSpinner"
          >
            {{ spinner }}
          </option>
        </select>
      </div>

      <div class="flex-1">
        <label
          :for="classInputId"
          class="mb-2 block font-mono text-sm"
        >
          class="..."
        </label>
        <input
          :id="classInputId"
          type="text"
          class="input w-full"
          placeholder="spinner-size-* | spinner-duration-* | text-violet-*"
          :value="inputStyles"
          @input="
            inputStyles = ($event.target as HTMLInputElement)?.value || ''
          "
        />
      </div>

      <button
        class="btn btn-primary"
        :disabled="!spinnerHTML"
        @click="handleViewCode"
      >
        Get Code
      </button>
    </div>

    <div class="text-warning font-warning mt-4 text-sm">
      Playground does not support arbitrary and custom values!
    </div>

    <div
      v-if="!!spinnerHTML"
      class="mt-16 flex items-center justify-center"
      v-html="spinnerHTML"
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
import { refDebounced } from '@vueuse/core';
import { createHighlighter } from 'shiki';
import DOMPurify from 'dompurify';

import spinners from '~/data/spinners';
import { codeHighlightTheme } from '~/data/config';

import { creator, type Spinner } from 'tw-epic-spinners';
import type { CodePreviewData } from '~/components/CodePreviewModal.vue';

const spinnerSelectId = useId();
const classInputId = useId();

const selectedSpinner = ref<Spinner | undefined>(`spinner-${spinners[0]}`);

const spinnerHTML = computed(() => {
  if (selectedSpinner.value) {
    return creator(selectedSpinner.value, dInputStyles.value);
  }

  return null;
});

const inputStyles = ref<string>('');

const dInputStyles = refDebounced(inputStyles, 500);

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

const handleViewCode = () => {
  if (!spinnerHTML.value) {
    return;
  }

  try {
    const sanitized = DOMPurify.sanitize(spinnerHTML.value, {
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

    const creatorStr = `const innerHTMLContent = creator('${selectedSpinner.value}'${dInputStyles.value ? `, '${dInputStyles.value}'` : ''});`;

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
