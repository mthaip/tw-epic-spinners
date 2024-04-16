import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { CSSRuleObject } from 'tailwindcss/types/config';

const SPINNER_HOLLOW_DOTS = 'spinner-hollow-dots';

const HOLLOW_DOTS_ANIMATION = 'spinner-hollow-dots-animation';

// ! Loop does not work
const hollowDotsKeyframes: CSSRuleObject | CSSRuleObject[] = {
  [`@keyframes ${HOLLOW_DOTS_ANIMATION}`]: {
    '50%': { transform: 'scale(1)', opacity: '1' },
    '100%': { opacity: '0' },
  },
};

const hollowDotsCSS = {
  height: `var(${SPINNER_SIZE_VAR})`,
  width: `calc(var(${SPINNER_SIZE_VAR}) * 2 * 3)`,

  '& .shape': {
    width: `var(${SPINNER_SIZE_VAR})`,
    height: `var(${SPINNER_SIZE_VAR})`,
    margin: `0 calc(var(${SPINNER_SIZE_VAR}) / 2)`,
    border: `calc(var(${SPINNER_SIZE_VAR}) / 5) solid currentColor`,
    borderRadius: '50%',
    cssFloat: 'left',
    transform: 'scale(0)',
    animation: `${HOLLOW_DOTS_ANIMATION} var(${SPINNER_DURATION_VAR}) ease infinite 0ms`,

    '&:nth-child(1)': {
      animationDelay: `calc(var(${SPINNER_DURATION_VAR}) / 3 * 1)`,
    },

    '&:nth-child(2)': {
      animationDelay: `calc(var(${SPINNER_DURATION_VAR}) / 3 * 2)`,
    },

    '&:nth-child(3)': {
      animationDelay: `calc(var(${SPINNER_DURATION_VAR}) / 3 * 3)`,
    },
  },

  ...hollowDotsKeyframes,
};

export default {
  name: SPINNER_HOLLOW_DOTS,
  components: hollowDotsCSS,
};
