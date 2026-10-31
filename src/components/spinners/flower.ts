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

const SPINNER_FLOWER = 'spinner-flower';
const FLOWER_ANIMATION = {
  ROTATION: buildSpinnerAnimationName(SPINNER_FLOWER, 'rotation'),
  BIGGER_DOT: buildSpinnerAnimationName(SPINNER_FLOWER, 'bigger-dot'),
  SMALLER_DOT: buildSpinnerAnimationName(SPINNER_FLOWER, 'smaller-dot'),
} as const;

const flowerKeyframes: CSSRules = {
  [`@keyframes ${FLOWER_ANIMATION.ROTATION}`]: {
    '50%': { transform: 'rotate(180deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  [`@keyframes ${FLOWER_ANIMATION.BIGGER_DOT}`]: {
    '0%, 100%': { boxShadow: 'currentColor 0 0 0' },
    '25%, 75%': {
      boxShadow: `currentColor calc(cos(var(--petal-angle)) * var(--bigger-radius)) calc(sin(var(--petal-angle)) * var(--bigger-radius)) 0`,
    },
  },
  [`@keyframes ${FLOWER_ANIMATION.SMALLER_DOT}`]: {
    '0%, 100%': { boxShadow: 'currentColor 0 0 0' },
    '25%, 75%': {
      boxShadow: `currentColor calc(cos(var(--petal-angle)) * var(--smaller-radius)) calc(sin(var(--petal-angle)) * var(--smaller-radius)) 0`,
    },
  },
};

const flowerCSS: CSSRules = {
  height: size,
  width: size,
  animation: `${FLOWER_ANIMATION.ROTATION} ${duration} infinite both`,

  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '0',
    margin: 'auto',
    height: `calc(${size} / 7)`,
    width: `calc(${size} / 7)`,
    backgroundColor: 'currentColor',
    borderRadius: '50%',
  },

  [`& > :where(.${SPINNER_ITEM})`]: {
    '--petal-angle': `calc(360deg * ${index} / ${count})`,
    '--bigger-radius': `calc(${size} / 2.7)`,
    '--smaller-radius': `calc(${size} / 5)`,
    '--petal-size': `min(calc(${size} / 7), calc(${size} * 8 / (${count} * 7)))`,
    position: 'absolute',
    inset: '0',
    margin: 'auto',
    height: 'var(--petal-size)',
    width: 'var(--petal-size)',
    '&:where(:nth-child(even))': {
      '--bigger-radius': `calc(${size} / 3.7 * sqrt(2))`,
      '--smaller-radius': `calc(${size} / 7 * sqrt(2))`,
    },

    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      inset: '0',
      borderRadius: '50%',
      animation: `${FLOWER_ANIMATION.BIGGER_DOT} ${duration} infinite both`,
    },

    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      inset: '10%',
      borderRadius: '50%',
      animation: `${FLOWER_ANIMATION.SMALLER_DOT} ${duration} infinite both`,
    },
  },
};

export default defineSpinner({
  name: SPINNER_FLOWER,
  styles: flowerCSS,
  keyframes: flowerKeyframes,
});
