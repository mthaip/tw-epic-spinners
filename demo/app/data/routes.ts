export const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home,
    icon: 'icon-[lucide--house]',
    meta: {
      title: 'Tailwind Epic Spinners',
      description:
        'Welcome to Tailwind Epic Spinners – Beautiful, customizable CSS spinners built with Tailwind CSS.',
    },
  },
  {
    path: '/docs',
    name: 'Docs',
    // component: Documentation,
    icon: 'icon-[lucide--book-open-text]',
    meta: {
      title: 'Docs · Tailwind Epic Spinners',
      description:
        'Explore the documentation for Tailwind Epic Spinners to learn how to install, customize, and integrate spinners in your project.',
    },
  },
  {
    path: '/playground',
    name: 'Playground',
    // component: Playground,
    icon: 'icon-[lucide--codesandbox]',
    meta: {
      title: 'Playground · Tailwind Epic Spinners',
      description:
        'Try out and customize your favorite spinner components in our interactive playground.',
    },
  },
] as const;
