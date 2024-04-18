import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { CSSRuleObject } from 'tailwindcss/types/config';

const SPINNER_FLOWER = 'spinner-flower';

const FLOWER_ANIMATION = {
  BIGGER_DOT: 'flower-spinner-bigger-dot-animation',
  SMALLER_DOT: 'flower-spinner-smaller-dot-animation',
};

const flowerKeyframes: CSSRuleObject | CSSRuleObject[] = {
  '--factor1': `calc(var(${SPINNER_SIZE_VAR}) / 2.7)`,
  '--factor2': `calc(var(${SPINNER_SIZE_VAR}) / 3.7)`,
  '--factor3': `calc(var(${SPINNER_SIZE_VAR}) / 5)`,
  '--factor4': `calc(var(${SPINNER_SIZE_VAR}) / 7)`,
  [`@keyframes ${FLOWER_ANIMATION.BIGGER_DOT}`]: {
    '0%, 100%': {
      boxShadow: `
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px
      `,
    },
    '50%': { transform: 'rotate(180deg)' },
    '25%, 75%': {
      boxShadow: `
        currentColor var(--factor1) 0px 0px, 
        currentColor calc(var(--factor1) * -1) 0px 0px, 
        currentColor 0px var(--factor1) 0px, 
        currentColor 0px calc(var(--factor1) * -1) 0px, 
        currentColor var(--factor2) calc(var(--factor2) * -1) 0px, 
        currentColor var(--factor2) var(--factor2) 0px, 
        currentColor calc(var(--factor2) * -1) calc(var(--factor2) * -1) 0px, 
        currentColor calc(var(--factor2) * -1) var(--factor2) 0px
      `,
    },
    '100%': {
      transform: 'rotate(360deg)',
      boxShadow: `
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px
      `,
    },
  },
  [`@keyframes ${FLOWER_ANIMATION.SMALLER_DOT}`]: {
    '0%, 100%': {
      boxShadow: `
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px
      `,
    },
    '25%, 75%': {
      boxShadow: `
        currentColor var(--factor3) 0px 0px,
        currentColor calc(var(--factor3) * -1) 0px 0px,
        currentColor 0px var(--factor3) 0px,
        currentColor 0px calc(var(--factor3) * -1) 0px,
        currentColor var(--factor4) calc(var(--factor4) * -1) 0px,
        currentColor var(--factor4) var(--factor4) 0px,
        currentColor calc(var(--factor4) * -1) calc(var(--factor4) * -1) 0px,
        currentColor calc(var(--factor4) * -1) var(--factor4) 0px
      `,
    },
    '100%': {
      boxShadow: `
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px
      `,
    },
  },
} as const;

const flowerCSS = {
  height: `var(${SPINNER_SIZE_VAR})`,
  width: `var(${SPINNER_SIZE_VAR})`,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  '& > div': {
    height: `calc(var(${SPINNER_SIZE_VAR}) / 7)`,
    width: `calc(var(${SPINNER_SIZE_VAR}) / 7)`,

    '& > div': {
      background: 'currentColor',
      height: '100%',
      width: '100%',
      padding: '10%',
      borderRadius: '50%',
      animation: `${FLOWER_ANIMATION.BIGGER_DOT} var(${SPINNER_DURATION_VAR}) 0s infinite both`,

      '&::before': {
        content: '""',
        display: 'block',
        background: 'currentColor',
        height: '100%',
        width: '100%',
        borderRadius: '50%',
        animation: `${FLOWER_ANIMATION.SMALLER_DOT} var(${SPINNER_DURATION_VAR}) 0s infinite both`,
      },
    },
  },

  ...flowerKeyframes,
};

export default { name: SPINNER_FLOWER, components: flowerCSS };
