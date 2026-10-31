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

const SPINNER_SELF_BUILDING_SQUARE = 'spinner-self-building-square';

const SELF_BUILDING_SQUARE_ANIMATION = {
  MAIN: buildSpinnerAnimationName(SPINNER_SELF_BUILDING_SQUARE, 'main'),
} as const;

const selfBuildingSquareKeyframes: CSSRules = {
  [`@keyframes ${SELF_BUILDING_SQUARE_ANIMATION.MAIN}`]: {
    '0%': { opacity: '0' },
    '5%': { opacity: '1', top: '0' },
    '50.9%': { opacity: '1', top: '0' },
    '55.9%': { opacity: '0', top: 'calc(var(--shapeSize) * -1 * 2 / 3)' },
  },
};

const selfBuildingSquareCSS: CSSRules = {
  width: size,
  height: size,

  [`& > :where(.${SPINNER_ITEM})`]: {
    '--columns': `round(up, sqrt(${count}), 1)`,
    '--row': `round(down, calc(${index} / var(--columns)), 1)`,
    '--column': `mod(${index}, var(--columns))`,
    '--cell-size': `calc(${size} / var(--columns))`,
    '--shapeSize': 'calc(var(--cell-size) * 0.75)',
    '--build-order':
      'calc((var(--columns) - 1 - var(--row)) * var(--columns) + var(--column))',
    position: 'absolute',
    top: 'calc(var(--row) * var(--cell-size) + var(--shapeSize) / 3)',
    left: 'calc(var(--column) * var(--cell-size))',
    height: 'var(--shapeSize)',
    width: 'var(--shapeSize)',

    // The pseudo-element keeps the original animated top/opacity separate
    // from grid positioning. Baseline delays still run bottom row first.
    '&::before': {
      content: '""',
      display: 'block',
      position: 'relative',
      height: '100%',
      width: '100%',
      top: 'calc(var(--shapeSize) * -1 * 2 / 3)',
      backgroundColor: 'currentColor',
      opacity: '0',
      animation: `${SELF_BUILDING_SQUARE_ANIMATION.MAIN} ${duration} infinite`,
      animationDelay: `calc(${duration} * 0.45 * var(--build-order) / ${count})`,
    },
  },
};

export default defineSpinner({
  name: SPINNER_SELF_BUILDING_SQUARE,
  styles: selfBuildingSquareCSS,
  keyframes: selfBuildingSquareKeyframes,
});
