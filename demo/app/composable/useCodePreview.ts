import type { SpinnerName } from '~/data/spinners';

function formatElement(element: Element, depth = 0): string {
  const indent = '  '.repeat(depth);
  const attributes = [...element.attributes]
    .filter((attribute) => attribute.name === 'class' || attribute.name === 'aria-hidden')
    .map(
      (attribute) =>
        ` ${attribute.name}="${attribute.value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')}"`,
    )
    .join('');
  const opening = `${indent}<div${attributes}>`;
  if (!element.children.length) return `${opening}</div>`;
  return `${opening}\n${[...element.children].map((child) => formatElement(child, depth + 1)).join('\n')}\n${indent}</div>`;
}

export default function useCodePreview() {
  const open = ref(false);
  const code = ref('');
  const name = ref<SpinnerName>('flower');
  const showCode = (element: Element, spinner: SpinnerName) => {
    name.value = spinner;
    code.value = formatElement(element);
    open.value = true;
  };
  return { open, code, name, showCode };
}
