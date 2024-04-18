import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';
import spinners from './src';

export default {
  darkMode: 'selector',
  content: ['**/*.vue', '**/*.html'],
  theme: {
    extend: {
      sans: ['Roboto', ...defaultTheme.fontFamily.sans],
    },
  },
  // ! Used for showcase only
  safelist: [
    {
      pattern: /spinner-size-*/,
    },
    {
      pattern: /spinner-duration-*/,
    },
    {
      pattern: /text-violet-*/,
    },
  ],
  plugins: [spinners],
} satisfies Config;
