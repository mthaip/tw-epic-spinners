import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { CSSRuleObject } from 'tailwindcss/types/config';

const SPINNER_SCALING_SQUARES = 'spinner-scaling-squares';

const SCALING_SQUARES_ANIMATION = {
  MAIN: 'scaling-squares-animation',
  FIRST: 'scaling-squares-spinner-animation-child-1',
  SECOND: 'scaling-squares-spinner-animation-child-2',
  THIRD: 'scaling-squares-spinner-animation-child-3',
  FOURTH: 'scaling-squares-spinner-animation-child-4',
};

const scalingSquaresKeyframes: CSSRuleObject | CSSRuleObject[] = {
  [`@keyframes ${SCALING_SQUARES_ANIMATION.MAIN}`]: {
    '50%': { transform: 'rotate(90deg)' },
    '100%': { transform: 'rotate(180deg)' },
  },
  [`@keyframes ${SCALING_SQUARES_ANIMATION.FIRST}`]: {
    '50%': { transform: 'translate(150%,150%) scale(2,2)' },
  },
  [`@keyframes ${SCALING_SQUARES_ANIMATION.SECOND}`]: {
    '50%': { transform: 'translate(-150%,150%) scale(2,2)' },
  },
  [`@keyframes ${SCALING_SQUARES_ANIMATION.THIRD}`]: {
    '50%': { transform: 'translate(-150%,-150%) scale(2,2)' },
  },
  [`@keyframes ${SCALING_SQUARES_ANIMATION.FOURTH}`]: {
    '50%': { transform: 'translate(150%,-150%) scale(2,2)' },
  },
};

const scalingSquaresCSS = {
  height: `var(${SPINNER_SIZE_VAR})`,
  width: `var(${SPINNER_SIZE_VAR})`,
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  transform: 'rotate(0deg)',
  animation: `${SCALING_SQUARES_ANIMATION.MAIN} var(${SPINNER_DURATION_VAR}) infinite`,

  '& .shape': {
    height: `calc(var(${SPINNER_SIZE_VAR}) * 0.25 / 1.3)`,
    width: `calc(var(${SPINNER_SIZE_VAR}) * 0.25 / 1.3)`,
    marginRight: 'auto',
    marginLeft: 'auto',
    border: `calc(var(${SPINNER_SIZE_VAR}) * 0.04 / 1.3) solid currentColor`,
    position: 'absolute',
    animationDuration: '1250ms',
    animationIterationCount: 'infinite',

    '&:nth-child(1)': {
      animationName: SCALING_SQUARES_ANIMATION.FIRST,
    },

    '&:nth-child(2)': {
      animationName: SCALING_SQUARES_ANIMATION.SECOND,
    },

    '&:nth-child(3)': {
      animationName: SCALING_SQUARES_ANIMATION.THIRD,
    },

    '&:nth-child(4)': {
      animationName: SCALING_SQUARES_ANIMATION.FOURTH,
    },
  },

  ...scalingSquaresKeyframes,
};

export default {
  name: SPINNER_SCALING_SQUARES,
  components: scalingSquaresCSS,
};
