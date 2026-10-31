<template>
  <div class="relative min-h-0 min-w-0" :aria-busy="!ready">
    <div ref="host" class="h-full w-full" :class="{ invisible: !ready }" />
    <USkeleton v-if="!ready" aria-label="Loading code editor" class="absolute inset-0 h-full w-full rounded-none" />
  </div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor';
import 'monaco-editor/features/iPadShowKeyboard/register';
import EditorWorker from 'monaco-editor/editor/editor.worker?worker';
import HtmlWorker from 'monaco-editor/language/html/html.worker?worker';
import { textmateThemeToMonacoTheme } from '@shikijs/monaco';
import { codeThemes } from '~~/shared/code-theme';
import { prepareMonacoHighlighting } from '~/utils/monaco-highlighter.client';

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{
  'update:modelValue': [value: string];
  format: [];
}>();
const host = ref<HTMLElement>();
const ready = ref(false);
const colorMode = useColorMode();
let editor: monaco.editor.IStandaloneCodeEditor | undefined;
let model: monaco.editor.ITextModel | undefined;
let subscription: monaco.IDisposable | undefined;
let observer: MutationObserver | undefined;
let palette = '';
let highlighter: Awaited<ReturnType<typeof prepareMonacoHighlighting>> | undefined;

self.MonacoEnvironment = {
  getWorker(_id, label) {
    return label === 'html' ? new HtmlWorker() : new EditorWorker();
  },
};

// Keep editor chrome on Nuxt UI tokens; syntax comes from the docs' Shiki themes.
// Monaco requires hex colors, so resolve CSS tokens through the browser.
function syncTheme() {
  if (!host.value || !editor || !highlighter) return;
  const styles = getComputedStyle(host.value);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const context = canvas.getContext('2d')!;
  const color = (token: string) => {
    context.fillStyle = styles.getPropertyValue(token).trim();
    context.fillRect(0, 0, 1, 1);
    return '#' + Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3)
      .map((channel) => channel.toString(16).padStart(2, '0')).join('');
  };
  const background = color('--ui-bg-muted');
  const dimmed = color('--ui-text-dimmed');
  const primary = color('--ui-primary');
  const border = color('--ui-border');
  const elevated = color('--ui-bg-elevated');
  const fontFamily = styles.getPropertyValue('--font-mono').trim();
  const signature = [colorMode.value, background, dimmed, primary, border, elevated, fontFamily].join();
  if (signature === palette) return;
  palette = signature;
  const name = colorMode.value === 'dark' ? codeThemes.dark : codeThemes.light;
  const theme = textmateThemeToMonacoTheme(highlighter.getTheme(name));
  monaco.editor.defineTheme(name, {
    ...theme,
    colors: {
      ...theme.colors,
      'editor.background': background,
      'editorLineNumber.foreground': dimmed,
      'editor.lineHighlightBackground': elevated,
      'editor.lineHighlightBorder': '#00000000',
      'editorOverviewRuler.border': '#00000000',
      'editor.selectionBackground': `${primary}33`,
      'editorCursor.foreground': primary,
      'editorIndentGuide.background1': border,
      'editorWidget.background': elevated,
    },
  });
  monaco.editor.setTheme(name);
  editor.updateOptions({ fontFamily });
}

onMounted(async () => {
  highlighter = await prepareMonacoHighlighting(monaco);
  if (!host.value) return;
  model = monaco.editor.createModel(props.modelValue, 'html');
  editor = monaco.editor.create(host.value!, {
    model, automaticLayout: true, ariaLabel: 'HTML code editor',
    fontFamily: getComputedStyle(host.value!).getPropertyValue('--font-mono'),
    fontSize: 13, lineHeight: 24, tabSize: 2, insertSpaces: true,
    minimap: { enabled: false }, scrollBeyondLastLine: false,
    lineNumbersMinChars: 3, glyphMargin: false,
    wordWrap: 'on', overviewRulerLanes: 0,
    fixedOverflowWidgets: true,
  });
  syncTheme();
  editor.addAction({
    id: 'lab.format', label: 'Format HTML',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF],
    contextMenuGroupId: '1_modification',
    run: () => emit('format'),
  });
  subscription = editor.onDidChangeModelContent(() => emit('update:modelValue', editor!.getValue()));
  observer = new MutationObserver(syncTheme);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
  observer.observe(document.head, { childList: true, subtree: true, characterData: true });
  ready.value = true;
});
watch(() => colorMode.value, () => nextTick(syncTheme));
watch(() => props.modelValue, (value) => {
  if (editor && model && value !== editor.getValue()) {
    editor.pushUndoStop();
    editor.executeEdits('lab.external-edit', [{ range: model.getFullModelRange(), text: value }]);
    editor.pushUndoStop();
  }
});
onBeforeUnmount(() => {
  observer?.disconnect();
  subscription?.dispose();
  editor?.dispose();
  model?.dispose();
});
</script>
