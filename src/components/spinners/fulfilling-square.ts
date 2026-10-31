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

const SPINNER_FULFILLING_SQUARE = 'spinner-fulfilling-square';

const FULFILLING_SQUARE_ANIMATION = {
  MAIN: buildSpinnerAnimationName(SPINNER_FULFILLING_SQUARE, 'main'),
  SHAPE: buildSpinnerAnimationName(SPINNER_FULFILLING_SQUARE, 'shape'),
} as const;

const fulfillingSquareKeyframes: CSSRules = {
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

const fulfillingSquareCSS: CSSRules = {
  height: size,
  width: size,

  [`& > :where(.${SPINNER_ITEM})`]: {
    '--columns': `round(up, sqrt(${count}), 1)`,
    '--row': `round(down, calc(${index} / var(--columns)), 1)`,
    '--column': `mod(${index}, var(--columns))`,
    '--cell-size': `calc(${size} / var(--columns))`,
    position: 'absolute',
    top: 'calc(var(--row) * var(--cell-size))',
    left: 'calc(var(--column) * var(--cell-size))',
    height: 'var(--cell-size)',
    width: 'var(--cell-size)',
    border: 'calc(var(--cell-size) / 12.5) solid currentColor',
    animation: `${FULFILLING_SQUARE_ANIMATION.MAIN} ${duration} infinite ease`,

    '&::before': {
      content: '""',
      verticalAlign: 'top',
      display: 'inline-block',
      backgroundColor: 'currentColor',
      width: '100%',
      opacity: '1',
      animation: `${FULFILLING_SQUARE_ANIMATION.SHAPE} ${duration} infinite ease-in`,
    },
  },
};

export default defineSpinner({
  name: SPINNER_FULFILLING_SQUARE,
  styles: fulfillingSquareCSS,
  keyframes: fulfillingSquareKeyframes,
});
