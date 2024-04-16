import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { CSSRuleObject } from 'tailwindcss/types/config';

const SPINNER_FULFILLING_SQUARE = 'spinner-fulfilling-square';

const FULFILLING_SQUARE_ANIMATION = {
  MAIN: 'fulfilling-square-spinner-animation',
  SHAPE: 'fulfilling-square-spinner-inner-animation',
};

const fulfillingSquareKeyframes: CSSRuleObject | CSSRuleObject[] = {
  [`@keyframes ${FULFILLING_SQUARE_ANIMATION.MAIN}`]: {
    '0%': { transform: 'rotate(0deg)' },
    '25%': { transform: 'rotate(180deg)' },
    '50%': { transform: 'rotate(180deg)' },
    '75%': { transform: 'rotate(360deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  [`@keyframes ${FULFILLING_SQUARE_ANIMATION.SHAPE}`]: {
    '0%': { height: '0%' },
    '25%': { height: '0%' },
    '50%': { height: '100%' },
    '75%': { height: '100%' },
    '100%': { height: '0%' },
  },
};

const fulfillingSquareCSS = {
  height: `var(${SPINNER_SIZE_VAR})`,
  width: `var(${SPINNER_SIZE_VAR})`,
  position: 'relative',
  border: '4px solid currentColor',
  animation: `${FULFILLING_SQUARE_ANIMATION.MAIN} var(${SPINNER_DURATION_VAR}) infinite ease`,

  '& .shape': {
    verticalAlign: 'top',
    display: 'inline-block',
    backgroundColor: 'currentColor',
    width: '100%',
    opacity: '1',
    animation: `${FULFILLING_SQUARE_ANIMATION.SHAPE} var(${SPINNER_DURATION_VAR}) infinite ease-in`,
  },

  ...fulfillingSquareKeyframes,
};

export default {
  name: SPINNER_FULFILLING_SQUARE,
  components: fulfillingSquareCSS,
};
