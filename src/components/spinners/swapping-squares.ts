import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { CSSRuleObject } from 'tailwindcss/types/config';

const SPINNER_SWAPPING_SQUARES = 'spinner-swapping-squares';

const SWAPPING_SQUARES_ANIMATION = {
  FIRST: 'swapping-squares-animation-child-1',
  SECOND: 'swapping-squares-animation-child-2',
  THIRD: 'swapping-squares-animation-child-3',
  FOURTH: 'swapping-squares-animation-child-4',
};

const swappingSquaresKeyframes: CSSRuleObject | CSSRuleObject[] = {
  [`@keyframes ${SWAPPING_SQUARES_ANIMATION.FIRST}`]: {
    '50%': { transform: 'translate(150%,150%) scale(2,2)' },
  },
  [`@keyframes ${SWAPPING_SQUARES_ANIMATION.SECOND}`]: {
    '50%': { transform: 'translate(-150%,150%) scale(2,2)' },
  },
  [`@keyframes ${SWAPPING_SQUARES_ANIMATION.THIRD}`]: {
    '50%': { transform: 'translate(-150%,-150%) scale(2,2)' },
  },
  [`@keyframes ${SWAPPING_SQUARES_ANIMATION.FOURTH}`]: {
    '50%': { transform: 'translate(150%,-150%) scale(2,2)' },
  },
};

const swappingSquaresCSS = {
  height: `var(${SPINNER_SIZE_VAR})`,
  width: `var(${SPINNER_SIZE_VAR})`,
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

  '& .shape': {
    height: `calc(var(${SPINNER_SIZE_VAR}) * 0.25 / 1.3)`,
    width: `calc(var(${SPINNER_SIZE_VAR}) * 0.25 / 1.3)`,
    border: `calc(var(${SPINNER_SIZE_VAR}) * 0.04 / 1.3) solid currentColor`,
    marginRight: 'auto',
    marginLeft: 'auto',
    position: 'absolute',
    animationIterationCount: 'infinite',
    animationDuration: `var(${SPINNER_DURATION_VAR})`,

    '&:nth-child(1)': {
      animationName: SWAPPING_SQUARES_ANIMATION.FIRST,
      animationDelay: `calc(var(${SPINNER_DURATION_VAR}) / 2)`,
    },

    '&:nth-child(2)': {
      animationName: SWAPPING_SQUARES_ANIMATION.SECOND,
      animationDelay: '0ms',
    },

    '&:nth-child(3)': {
      animationName: SWAPPING_SQUARES_ANIMATION.THIRD,
      animationDelay: `calc(var(${SPINNER_DURATION_VAR}) / 2)`,
    },

    '&:nth-child(4)': {
      animationName: SWAPPING_SQUARES_ANIMATION.FOURTH,
      animationDelay: '0ms',
    },
  },

  ...swappingSquaresKeyframes,
};

export default {
  name: SPINNER_SWAPPING_SQUARES,
  components: swappingSquaresCSS,
};
