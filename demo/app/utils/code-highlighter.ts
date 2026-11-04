import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import html from 'shiki/langs/html.mjs';
import lightTheme from 'shiki/themes/github-light-high-contrast.mjs';
import githubDark from 'shiki/themes/github-dark.mjs';

// Load only HTML and the two documentation themes, once per runtime.
let highlighter: ReturnType<typeof createHighlighterCore> | undefined;
export function getCodeHighlighter() {
  return highlighter ??= createHighlighterCore({
    langs: [html],
    themes: [lightTheme, githubDark],
    engine: createJavaScriptRegexEngine(),
  });
}
