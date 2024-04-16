import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { CSSRuleObject } from 'tailwindcss/types/config';

const SPINNER_FLOWER = 'spinner-flower';

const FLOWER_ANIMATION = {
  BIGGER_DOT: 'flower-spinner-bigger-dot-animation',
  SMALLER_DOT: 'flower-spinner-smaller-dot-animation',
};

const flowerKeyframes: CSSRuleObject | CSSRuleObject[] = {
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
        currentColor 26px 0px 0px, 
        currentColor -26px 0px 0px, 
        currentColor 0px 26px 0px, 
        currentColor 0px -26px 0px, 
        currentColor 19px -19px 0px, 
        currentColor 19px 19px 0px, 
        currentColor -19px -19px 0px, 
        currentColor -19px 19px 0px
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
        currentColor 14px 0px 0px,
        currentColor -14px 0px 0px,
        currentColor 0px 14px 0px,
        currentColor 0px -14px 0px,
        currentColor 10px -10px 0px,
        currentColor 10px 10px 0px,
        currentColor -10px -10px 0px,
        currentColor -10px 10px 0px
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

  '& .shape': {
    height: `calc(var(${SPINNER_SIZE_VAR}) / 7)`,
    width: `calc(var(${SPINNER_SIZE_VAR}) / 7)`,

    '& > div': {
      background: 'currentColor',
      height: '100%',
      width: '100%',
      padding: '10%',
      borderRadius: '50%',
      animation: `${FLOWER_ANIMATION.BIGGER_DOT} var(${SPINNER_DURATION_VAR}) 0s infinite both`,

      '& > div': {
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
