<template>
  <section id="lab" aria-label="Spinner lab" class="flex min-h-0 flex-1 flex-col">
    <UCard variant="outline" class="flex min-h-0 flex-1 flex-col" :ui="{ root: 'overflow-visible rounded-none ring-0 divide-y-0', header: 'relative shrink-0', body: 'min-h-0 flex-1' }">
      <template #header>
        <div class="flex flex-wrap items-center justify-start gap-2">
          <USelect v-model="selectedName" :items="spinnerNames" aria-label="Spinner" class="w-fit flex-none" :ui="{ value: 'whitespace-nowrap overflow-visible text-clip', content: 'w-max min-w-(--reka-select-trigger-width) max-w-[calc(100vw-1rem)]', itemLabel: 'whitespace-nowrap overflow-visible text-clip' }" />
          <UTooltip text="Format HTML">
            <UButton aria-label="Format" icon="i-lucide-wand-sparkles" color="neutral" variant="ghost" :loading="formatting" @click="formatCode" />
          </UTooltip>
          <UTooltip text="Reset">
            <UButton aria-label="Reset" icon="i-lucide-rotate-ccw" color="neutral" variant="ghost" @click="seedMarkup" />
          </UTooltip>
          <CopyToClipboard :content="markup" />
        </div>
        <USeparator class="absolute bottom-0 left-1/2 w-screen -translate-x-1/2" />
      </template>
      <div class="grid h-full min-h-0 grid-rows-2 gap-6 md:grid-cols-2 md:grid-rows-1">
        <ClientOnly>
          <LabEditor v-model="markup" class="h-full" @format="formatCode" />
          <template #fallback><USkeleton aria-label="Loading code editor" class="h-full w-full rounded-none" /></template>
        </ClientOnly>
        <ClientOnly>
          <iframe title="Spinner preview" sandbox="" :srcdoc="previewDocument" class="h-full w-full min-h-0" />
          <template #fallback><div class="h-full" /></template>
        </ClientOnly>
      </div>
    </UCard>
  </section>
</template>

<script setup lang="ts">
import LabEditor from './LabEditor.client.vue';
import useLabUtilities from '~/composable/useLabUtilities';
import spinners, { type SpinnerName } from '~/data/spinners';

defineOptions({ name: 'SpinnerLab' });
const toast = useToast();
const colorMode = useColorMode();
const route = useRoute();
function spinnerFromQuery(value: unknown): SpinnerName {
  return spinners.find(({ name }) => name === value)?.name ?? 'flower';
}
const selectedName = ref<SpinnerName>(spinnerFromQuery(route.query.spinner));
watch(() => route.query.spinner, (value) => { selectedName.value = spinnerFromQuery(value); });
const spinnerNames = spinners.map(({ name }) => name);
const markup = ref('');
const { css: utilityCss, error: utilityError } = useLabUtilities(markup);
const stylesheets = ref('');
const formatting = ref(false);
let mounted = false;
let formatRequest = 0;

function seedMarkup() {
  const spinner = spinners.find(({ name }) => name === selectedName.value)!;
  const items = Array.from({ length: spinner.count }, () => '  <div class="spinner-item"></div>').join('\n');
  markup.value = `<div class="spinner-${spinner.name} spinner-size-32 spinner-duration-3500 text-primary" aria-hidden="true">\n${items}\n</div>\n`;
  if (mounted) void formatCode();
}
watch(selectedName, seedMarkup);
seedMarkup();
watch(utilityError, (error) => { if (error) toast.add({ title: error, color: 'error' }); });

async function formatCode() {
  const request = ++formatRequest;
  formatting.value = true;
  const original = markup.value;
  try {
    const [prettier, html] = await Promise.all([
      import('prettier/standalone'), import('prettier/plugins/html'),
    ]);
    const formatted = await prettier.format(original, {
      parser: 'html', plugins: [html], printWidth: 80, tabWidth: 2,
    });
    if (request === formatRequest && markup.value === original) markup.value = formatted;
  }
  catch {
    if (request === formatRequest) toast.add({ title: 'Check the HTML syntax before formatting.', color: 'error' });
  }
  finally { if (request === formatRequest) formatting.value = false; }
}

let observer: MutationObserver | undefined;
onMounted(() => {
  mounted = true;
  void formatCode();
  const syncStyles = () => {
    stylesheets.value = Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((element) => {
        const copy = element.cloneNode(true) as HTMLElement;
        if (copy instanceof HTMLLinkElement) {
          // Sandboxed srcdoc has an opaque origin: stylesheet links need no CORS.
          copy.removeAttribute('crossorigin');
          copy.href = (element as HTMLLinkElement).href;
        }
        return copy.outerHTML;
      }).join('\n');
  };
  syncStyles();
  observer = new MutationObserver(syncStyles);
  observer.observe(document.head, { childList: true, subtree: true, characterData: true });
});
onBeforeUnmount(() => {
  mounted = false;
  formatRequest++;
  observer?.disconnect();
});

const previewDocument = computed(() => `<!doctype html>
<html class="${colorMode.value}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${stylesheets.value}
<style>${utilityCss.value}</style>
<style>body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 1rem; box-sizing: border-box; background: var(--ui-bg); color: var(--ui-text); }</style>
</head><body>${markup.value}</body></html>`);
</script>
