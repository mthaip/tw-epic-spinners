import type { CSSRules } from '../types';
import { SPINNER_ITEM } from '../utils/builder';

interface SpinnerDefinition {
  name: string;
  styles: CSSRules;
  keyframes: CSSRules;
}

// Only the v2 contract is shared. Layout, borders and animation timing belong
// to the spinner, so this wrapper cannot silently change their appearance.
export function defineSpinner({ name, styles, keyframes }: SpinnerDefinition) {
  const item = `& > :where(.${SPINNER_ITEM})`;
  return {
    components: {
      [`.${name}`]: {
        '--spinner-size': '4.5rem',
        '--spinner-duration': '1.5s',
        position: 'relative',
        boxSizing: 'border-box',
        ...styles,
        [item]: {
          '--spinner-count': 'sibling-count()',
          '--spinner-index': 'calc(sibling-index() - 1)',
          boxSizing: 'border-box',
          ...(styles[item] as CSSRules),
          '&::before, &::after': { boxSizing: 'border-box' },
        },
        '@media (prefers-reduced-motion: reduce)': {
          [`&, &::before, &::after, ${item}, ${item}::before, ${item}::after`]:
            {
              animationPlayState: 'paused !important',
            },
        },
      },
    } satisfies CSSRules,
    keyframes,
  };
}
