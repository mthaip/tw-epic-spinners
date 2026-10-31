import type { CSSRules } from '../../types';
import { defineSpinner } from '../base';
import {
  size,
  duration,
  count,
  index,
  buildSpinnerAnimationName,
  SPINNER_ITEM,
} from '../../utils/builder';

const SPINNER_SWAPPING_SQUARES = 'spinner-swapping-squares';

const SWAPPING_SQUARES_ANIMATION = {
  FIRST: buildSpinnerAnimationName(SPINNER_SWAPPING_SQUARES, 'first'),
  SECOND: buildSpinnerAnimationName(SPINNER_SWAPPING_SQUARES, 'second'),
  THIRD: buildSpinnerAnimationName(SPINNER_SWAPPING_SQUARES, 'third'),
  FOURTH: buildSpinnerAnimationName(SPINNER_SWAPPING_SQUARES, 'fourth'),
} as const;

const swappingSquaresKeyframes: CSSRules = {
  [`@keyframes ${SWAPPING_SQUARES_ANIMATION.FIRST}`]: {
    '50%': {
      transform:
        'translate(calc(150% * var(--movement-scale)),calc(150% * var(--movement-scale))) scale(2,2)',
    },
  },
  [`@keyframes ${SWAPPING_SQUARES_ANIMATION.SECOND}`]: {
    '50%': {
      transform:
        'translate(calc(-150% * var(--movement-scale)),calc(150% * var(--movement-scale))) scale(2,2)',
    },
  },
  [`@keyframes ${SWAPPING_SQUARES_ANIMATION.THIRD}`]: {
    '50%': {
      transform:
        'translate(calc(-150% * var(--movement-scale)),calc(-150% * var(--movement-scale))) scale(2,2)',
    },
  },
  [`@keyframes ${SWAPPING_SQUARES_ANIMATION.FOURTH}`]: {
    '50%': {
      transform:
        'translate(calc(150% * var(--movement-scale)),calc(-150% * var(--movement-scale))) scale(2,2)',
    },
  },
};

const swappingSquaresCSS: CSSRules = {
  height: size,
  width: size,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  [`& > :where(.${SPINNER_ITEM})`]: {
    // The original four directions repeat; extra parts shrink and stagger.
    '--movement-scale': `calc(max(4, ${count}) / 4)`,
    '--shape-size': `calc(${size} / max(4, ${count}))`,
    height: 'calc(var(--shape-size) / 1.3)',
    width: 'calc(var(--shape-size) / 1.3)',
    border: 'calc(var(--shape-size) * 0.16 / 1.3) solid currentColor',
    marginRight: 'auto',
    marginLeft: 'auto',
    position: 'absolute',
    animationIterationCount: 'infinite',
    animationDuration: `${duration}`,

    '&:where(:nth-child(4n+1))': {
      animationName: SWAPPING_SQUARES_ANIMATION.FIRST,
      animationDelay: `calc(${duration} / 2)`,
    },

    '&:where(:nth-child(4n+2))': {
      animationName: SWAPPING_SQUARES_ANIMATION.SECOND,
      animationDelay: '0ms',
    },

    '&:where(:nth-child(4n+3))': {
      animationName: SWAPPING_SQUARES_ANIMATION.THIRD,
      animationDelay: `calc(${duration} / 2)`,
    },

    '&:where(:nth-child(4n))': {
      animationName: SWAPPING_SQUARES_ANIMATION.FOURTH,
      animationDelay: '0ms',
    },

    '&:where(:nth-child(n+5))': {
      animationDelay: `calc(-1 * ${duration} * ${index} / ${count})`,
    },
  },
};

export default defineSpinner({
  name: SPINNER_SWAPPING_SQUARES,
  styles: swappingSquaresCSS,
  keyframes: swappingSquaresKeyframes,
});
