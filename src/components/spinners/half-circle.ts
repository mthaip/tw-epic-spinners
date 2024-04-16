import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { CSSRuleObject } from 'tailwindcss/types/config';

const SPINNER_HALF_CIRCLE = 'spinner-half-circle';

const HALF_CIRCLE_ANIMATION = 'animation-half-circle';

const halfCircleKeyframes: CSSRuleObject | CSSRuleObject[] = {
  [`@keyframes ${HALF_CIRCLE_ANIMATION}`]: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};

const halfCircleCSS = {
  width: `var(${SPINNER_SIZE_VAR})`,
  height: `var(${SPINNER_SIZE_VAR})`,
  borderRadius: '100%',
  position: 'relative',

  '& .shape': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '100%',
    border: `calc(var(${SPINNER_SIZE_VAR}) / 10) solid transparent`,
    borderTopColor: 'currentColor',
    animation: `${HALF_CIRCLE_ANIMATION} var(${SPINNER_DURATION_VAR}) infinite`,

    '&:nth-child(2)': {
      borderTopColor: 'transparent',
      borderBottomColor: 'currentColor',
      animationDirection: 'alternate',
    },
  },

  ...halfCircleKeyframes,
};

export default {
  name: SPINNER_HALF_CIRCLE,
  components: halfCircleCSS,
};
