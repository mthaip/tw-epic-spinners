import favicon from '../../public/favicon.svg?raw';

export default function useThemeFavicon() {
  const color = ref('');
  const href = computed(() => color.value
    ? `data:image/svg+xml,${encodeURIComponent(favicon.replace('currentColor', color.value))}`
    : '/favicon.svg');
  useHead({ link: [{ key: 'theme-favicon', rel: 'icon', type: 'image/svg+xml', href }] });

  let observer: MutationObserver | undefined;
  onMounted(() => {
    const sync = () => {
      color.value = getComputedStyle(document.documentElement).getPropertyValue('--ui-primary').trim();
    };
    sync();
    observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
  });
  onBeforeUnmount(() => observer?.disconnect());
}
