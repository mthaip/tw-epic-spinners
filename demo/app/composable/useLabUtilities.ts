export default function useLabUtilities(markup: Ref<string>) {
  const css = ref('');
  const error = ref('');
  let worker: Worker | undefined;
  let requestId = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  function update() {
    if (!worker) return;
    const document = new DOMParser().parseFromString(markup.value, 'text/html');
    const classes = [...new Set(
      Array.from(document.querySelectorAll('[class]')).flatMap((element) =>
        (element.getAttribute('class') ?? '').split(/\s+/),
      ),
    )].filter((name) => /(?:^|:)spinner-(?:size|duration)-/.test(name));
    worker.postMessage({ id: ++requestId, classes });
  }

  onMounted(() => {
    worker = new Worker(new URL('../workers/spinner-utilities.ts', import.meta.url), { type: 'module' });
    worker.onmessage = ({ data }: MessageEvent<{ id: number; css?: string; error?: string }>) => {
      if (data.id !== requestId) return;
      error.value = data.error ?? '';
      if (data.css !== undefined) css.value = data.css;
    };
    worker.onerror = () => { error.value = 'Unable to load the spinner utility compiler.'; };
    update();
  });
  watch(markup, () => {
    clearTimeout(timer);
    timer = setTimeout(update, 100);
  });
  onBeforeUnmount(() => {
    clearTimeout(timer);
    worker?.terminate();
  });
  return { css, error };
}
