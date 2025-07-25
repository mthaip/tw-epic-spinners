import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { buildSpinnerAnimationName } from '../../utils/builder';

const SPINNER_SWAPPING_SQUARES = 'spinner-swapping-squares';

const SWAPPING_SQUARES_ANIMATION = {
  FIRST: buildSpinnerAnimationName(SPINNER_SWAPPING_SQUARES, 'first'),
  SECOND: buildSpinnerAnimationName(SPINNER_SWAPPING_SQUARES, 'second'),
  THIRD: buildSpinnerAnimationName(SPINNER_SWAPPING_SQUARES, 'third'),
  FOURTH: buildSpinnerAnimationName(SPINNER_SWAPPING_SQUARES, 'fourth'),
} as const;

const swappingSquaresKeyframes = {
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

  '& > div': {
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
};

const creator = (classes: string = ''): string => {
  return `
    <div class="${SPINNER_SWAPPING_SQUARES} ${classes}">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `.trim();
};

export default {
  name: SPINNER_SWAPPING_SQUARES,
  components: swappingSquaresCSS,
  keyframes: swappingSquaresKeyframes,
  creator,
};
