<template>
  <component :is="animateLines ? TransitionGroup : 'code'" v-bind="animateLines ? transitions : {}" class="font-mono"><span v-for="(line, index) in lines" :key="line.key" class="line block" :class="index + 1 === highlightLine ? 'bg-accented/50' : undefined"><span v-for="(token, tokenIndex) in line.tokens" :key="tokenIndex" class="text-[var(--code-light)] dark:text-[var(--code-dark)]" :style="{ '--code-light': token.variants.light?.color, '--code-dark': token.variants.dark?.color }">{{ token.content }}</span><template v-if="!line.tokens.length">{{ ' ' }}</template></span></component>
</template>

<script setup lang="ts">
import { TransitionGroup } from 'vue';
import { codeThemes } from '~~/shared/code-theme';
import { getCodeHighlighter } from '~/utils/code-highlighter';

const props = withDefaults(defineProps<{
  code: string;
  highlightLine?: number;
  animateLines?: boolean;
}>(), { highlightLine: undefined, animateLines: false });
const highlighter = await getCodeHighlighter();
const lines = computed(() => {
  const occurrences = new Map<string, number>();
  return highlighter.codeToTokensWithThemes(props.code, {
    lang: 'html', themes: { light: codeThemes.light, dark: codeThemes.dark },
  }).map((tokens) => {
    const text = tokens.map(({ content }) => content).join('');
    const occurrence = occurrences.get(text) ?? 0;
    occurrences.set(text, occurrence + 1);
    return { key: `${text}:${occurrence}`, tokens };
  });
});

// Keep repeated item lines distinct so Vue animates the item, not the closing tag.
const transitions = {
  tag: 'code',
  enterActiveClass: 'overflow-hidden transition-[max-height,opacity,translate] duration-500 ease-out motion-reduce:transition-none',
  enterFromClass: 'max-h-0 -translate-x-4 opacity-0',
  enterToClass: 'max-h-6 translate-x-0 opacity-100',
  leaveActiveClass: 'overflow-hidden transition-[max-height,opacity,translate] duration-500 ease-in motion-reduce:transition-none',
  leaveFromClass: 'max-h-6 translate-x-0 opacity-100',
  leaveToClass: 'max-h-0 translate-x-4 opacity-0',
};
</script>
