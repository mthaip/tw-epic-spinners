import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { buildSpinnerAnimationName } from '../../utils/builder';

const SPINNER_SCALING_SQUARES = 'spinner-scaling-squares';

const SCALING_SQUARES_ANIMATION = {
  MAIN: buildSpinnerAnimationName(SPINNER_SCALING_SQUARES, 'main'),
  FIRST: buildSpinnerAnimationName(SPINNER_SCALING_SQUARES, 'first'),
  SECOND: buildSpinnerAnimationName(SPINNER_SCALING_SQUARES, 'second'),
  THIRD: buildSpinnerAnimationName(SPINNER_SCALING_SQUARES, 'third'),
  FOURTH: buildSpinnerAnimationName(SPINNER_SCALING_SQUARES, 'fourth'),
} as const;

const scalingSquaresKeyframes = {
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

  '& > div': {
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
};

const creator = (classes: string = ''): string => {
  return `
    <div class="${SPINNER_SCALING_SQUARES} ${classes}">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `.trim();
};

export default {
  name: SPINNER_SCALING_SQUARES,
  components: scalingSquaresCSS,
  keyframes: scalingSquaresKeyframes,
  creator,
};
