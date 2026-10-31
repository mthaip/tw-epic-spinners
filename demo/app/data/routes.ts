export const routes = [
  {
    path: '/',
    meta: {
      title: 'tw-epic-spinners v2 · Composable Tailwind CSS spinners',
      description:
        '20 composable, pure-CSS loading spinners for Tailwind CSS v3 and v4. Start with a baseline, add or remove items, and make it your own.',
    },
  },
  {
    path: '/docs',
    meta: {
      title: 'v2 Docs · tw-epic-spinners',
      description:
        'Install tw-epic-spinners v2, compose spinner-item markup, customize size and duration, and migrate from v1. Includes all 20 baseline spinners.',
    },
  },
  {
    path: '/labs',
    meta: {
      title: 'Spinner Lab · tw-epic-spinners v2',
      description: 'Build a custom Tailwind CSS spinner in the v2 Lab. Edit HTML, add or remove spinner items, and preview size and animation duration changes live.',
    },
  },
] as const;
