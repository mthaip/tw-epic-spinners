import { shikiToMonaco } from '@shikijs/monaco';
import { getCodeHighlighter } from './code-highlighter';

let registered = false;
export async function prepareMonacoHighlighting(monaco: typeof import('monaco-editor')) {
  const highlighter = await getCodeHighlighter();
  if (!registered) {
    // Shiki types its adapter against monaco-editor-core; the full package
    // exposes the same API but declares its editor enums in a separate module.
    shikiToMonaco(highlighter, monaco as unknown as Parameters<typeof shikiToMonaco>[1]);
    registered = true;
  }
  return highlighter;
}
