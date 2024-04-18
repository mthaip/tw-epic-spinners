import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { CSSRuleObject } from 'tailwindcss/types/config';

const SPINNER_SEMIPOLAR = 'spinner-semipolar';

const SEMIPOLAR_ANIMATION = { MAIN: 'animation-semipolar' };

const semipolarKeyframes: CSSRuleObject | CSSRuleObject[] = {
  [`@keyframes ${SEMIPOLAR_ANIMATION.MAIN}`]: {
    '50%': { transform: 'rotate(360deg) scale(0.7)' },
  },
};

const semipolarCSS = {
  width: `var(${SPINNER_SIZE_VAR})`,
  height: `var(${SPINNER_SIZE_VAR})`,
  position: 'relative',

  '& > div': {
    borderRadius: '50%',
    position: 'absolute',
    border: `calc(var(${SPINNER_SIZE_VAR}) * 0.05) solid transparent`,
    borderTopColor: 'currentColor',
    borderLeftColor: 'currentColor',
    animation: `${SEMIPOLAR_ANIMATION.MAIN} var(${SPINNER_DURATION_VAR}) infinite`,

    '&:nth-child(1)': {
      height: `calc(var(${SPINNER_SIZE_VAR}) - var(${SPINNER_SIZE_VAR}) * 0.2 * 0)`,
      width: `calc(var(${SPINNER_SIZE_VAR}) - var(${SPINNER_SIZE_VAR}) * 0.2 * 0)`,
      top: `calc(var(${SPINNER_SIZE_VAR}) * 0.1 * 0)`,
      left: `calc(var(${SPINNER_SIZE_VAR}) * 0.1 * 0)`,
      animationDelay: `calc(var(${SPINNER_DURATION_VAR}) * 0.1 * 4)`,
      zIndex: '5',
    },

    '&:nth-child(2)': {
      height: `calc(var(${SPINNER_SIZE_VAR}) - var(${SPINNER_SIZE_VAR}) * 0.2 * 1)`,
      width: `calc(var(${SPINNER_SIZE_VAR}) - var(${SPINNER_SIZE_VAR}) * 0.2 * 1)`,
      top: `calc(var(${SPINNER_SIZE_VAR}) * 0.1 * 1)`,
      left: `calc(var(${SPINNER_SIZE_VAR}) * 0.1 * 1)`,
      animationDelay: `calc(var(${SPINNER_DURATION_VAR}) * 0.1 * 3)`,
      zIndex: '4',
    },

    '&:nth-child(3)': {
      height: `calc(var(${SPINNER_SIZE_VAR}) - var(${SPINNER_SIZE_VAR}) * 0.2 * 2)`,
      width: `calc(var(${SPINNER_SIZE_VAR}) - var(${SPINNER_SIZE_VAR}) * 0.2 * 2)`,
      top: `calc(var(${SPINNER_SIZE_VAR}) * 0.1 * 2)`,
      left: `calc(var(${SPINNER_SIZE_VAR}) * 0.1 * 2)`,
      animationDelay: `calc(var(${SPINNER_DURATION_VAR}) * 0.1 * 2)`,
      zIndex: '3',
    },

    '&:nth-child(4)': {
      height: `calc(var(${SPINNER_SIZE_VAR}) - var(${SPINNER_SIZE_VAR}) * 0.2 * 3)`,
      width: `calc(var(${SPINNER_SIZE_VAR}) - var(${SPINNER_SIZE_VAR}) * 0.2 * 3)`,
      top: `calc(var(${SPINNER_SIZE_VAR}) * 0.1 * 3)`,
      left: `calc(var(${SPINNER_SIZE_VAR}) * 0.1 * 3)`,
      animationDelay: `calc(var(${SPINNER_DURATION_VAR}) * 0.1 * 1)`,
      zIndex: '2',
    },

    '&:nth-child(5)': {
      height: `calc(var(${SPINNER_SIZE_VAR}) - var(${SPINNER_SIZE_VAR}) * 0.2 * 4)`,
      width: `calc(var(${SPINNER_SIZE_VAR}) - var(${SPINNER_SIZE_VAR}) * 0.2 * 4)`,
      top: `calc(var(${SPINNER_SIZE_VAR}) * 0.1 * 4)`,
      left: `calc(var(${SPINNER_SIZE_VAR}) * 0.1 * 4)`,
      animationDelay: `calc(var(${SPINNER_DURATION_VAR}) * 0.1 * 0)`,
      zIndex: '1',
    },
  },

  ...semipolarKeyframes,
};

export default {
  name: SPINNER_SEMIPOLAR,
  components: semipolarCSS,
};
