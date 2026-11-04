export const routes = [
  {
    path: '/',
    meta: {
      title: 'Epic Spinners for Tailwind CSS · tw-epic-spinners',
      description:
        'Preview 20 pure-CSS loading spinners inspired by Epic Spinners. Copy the HTML, customize a design in the Spinner Lab, and use it with Tailwind CSS v3 or v4.',
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
