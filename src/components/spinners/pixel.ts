import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { CSSRuleObject } from 'tailwindcss/types/config';

const SPINNER_PIXEL = 'spinner-pixel';

const PIXEL_ANIMATION = 'pixel-spinner-animation';

const pixelKeyframes: CSSRuleObject | CSSRuleObject[] = {
  [`@keyframes ${PIXEL_ANIMATION}`]: {
    '50%': {
      boxShadow: `
        20px 20px 0px 0px,
        -20px -20px 0px 0px,
        20px -20px 0px 0px,
        -20px 20px 0px 0px,
        0px 10px 0px 0px,
        10px 0px 0px 0px,
        -10px 0px 0px 0px,
        0px -10px 0px 0px
      `,
    },
    '75%': {
      boxShadow: `
        20px 20px 0px 0px,
        -20px -20px 0px 0px,
        20px -20px 0px 0px,
        -20px 20px 0px 0px,
        0px 10px 0px 0px,
        10px 0px 0px 0px,
        -10px 0px 0px 0px,
        0px -10px 0px 0px
      `,
    },
    '100%': { transform: 'rotate(360deg)' },
  },
};

const pixelCSS = {
  width: `var(${SPINNER_SIZE_VAR})`,
  height: `var(${SPINNER_SIZE_VAR})`,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

  '& .shape': {
    height: `calc(var(${SPINNER_SIZE_VAR}) / 7)`,
    width: `calc(var(${SPINNER_SIZE_VAR}) / 7)`,
    backgroundColor: 'currentColor',
    color: 'currentColor',
    boxShadow:
      '15px 15px 0 0, -15px -15px 0 0, 15px -15px 0 0, -15px 15px 0 0, 0 15px 0 0, 15px 0 0 0, -15px 0 0 0, 0 -15px 0 0',
    animation: `${PIXEL_ANIMATION} var(${SPINNER_DURATION_VAR}) linear infinite`,
  },

  ...pixelKeyframes,
};

export default {
  name: SPINNER_PIXEL,
  components: pixelCSS,
};
