<template>
  <dialog class="modal">
    <div class="modal-box">
      <div class="tabs tabs-lift">
        <template v-for="(tab, index) in tabs">
          <input
            type="radio"
            name="`spinner-code-preview"
            :aria-label="tab.name"
            class="tab"
            :checked="index === 0"
          />
          <div class="tab-content bg-base-100 border-base-300 relative">
            <div
              class="prose"
              v-html="tab.preview"
            />
            <CopyToClipboard
              class="absolute top-2 right-2"
              :content="tab.code"
            />
          </div>
        </template>
      </div>

      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
          ✕
        </button>
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
import { computed } from 'vue';
import CopyToClipboard from './CopyToClipboard.vue';

export type CodePreviewData = {
  preview: string;
  code: string;
};

const props = defineProps<{
  html: CodePreviewData;
  creator: CodePreviewData;
}>();

const tabs = computed(
  () =>
    [
      {
        name: 'HTML',
        ...props.html,
      },
      {
        name: 'Creator',
        ...props.creator,
      },
    ] as const,
);
</script>
