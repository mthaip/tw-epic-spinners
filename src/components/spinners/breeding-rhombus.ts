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

const SPINNER_BREEDING_RHOMBUS = 'spinner-breeding-rhombus';
const BREEDING_RHOMBUS_ANIMATION = {
  MAIN: buildSpinnerAnimationName(SPINNER_BREEDING_RHOMBUS, 'main'),
  SHAPE: buildSpinnerAnimationName(SPINNER_BREEDING_RHOMBUS, 'shape'),
} as const;

const breedingRhombusKeyframes: CSSRules = {
  [`@keyframes ${BREEDING_RHOMBUS_ANIMATION.MAIN}`]: {
    '50%': { transform: 'scale(0.5)' },
  },
  [`@keyframes ${BREEDING_RHOMBUS_ANIMATION.SHAPE}`]: {
    '50%': {
      transform:
        'translate(calc(var(--x) / var(--edge) * 325% * var(--travel-scale)), calc(var(--y) / var(--edge) * 325% * var(--travel-scale)))',
    },
  },
};

const breedingRhombusCSS: CSSRules = {
  width: size,
  height: size,
  transform: 'rotate(45deg)',
  '&::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    height: `calc(${size} / 3)`,
    width: `calc(${size} / 3)`,
    top: `calc(${size} / 3)`,
    left: `calc(${size} / 3)`,
    backgroundColor: 'currentColor',
    animation: `${BREEDING_RHOMBUS_ANIMATION.MAIN} ${duration} infinite calc(${duration} / 4)`,
  },

  [`& > :where(.${SPINNER_ITEM})`]: {
    '--shape-angle': `calc(-135deg + 360deg * ${index} / ${count})`,
    '--x': 'cos(var(--shape-angle))',
    '--y': 'sin(var(--shape-angle))',
    '--edge':
      'max(var(--x), calc(-1 * var(--x)), var(--y), calc(-1 * var(--y)))',
    '--travel-scale': `calc(max(8, ${count}) / 8)`,
    '--shape-size': `calc(${size} * 8 / (max(8, ${count}) * 7.5))`,
    height: 'var(--shape-size)',
    width: 'var(--shape-size)',
    top: `calc(${size} / 2 - var(--shape-size) / 2)`,
    left: `calc(${size} / 2 - var(--shape-size) / 2)`,
    position: 'absolute',
    backgroundColor: 'currentColor',
    animation: `${BREEDING_RHOMBUS_ANIMATION.SHAPE} ${duration} infinite`,
    animationDelay: `calc(${duration} * 0.4 * (${index} + 1) / ${count})`,
  },
};

export default defineSpinner({
  name: SPINNER_BREEDING_RHOMBUS,
  styles: breedingRhombusCSS,
  keyframes: breedingRhombusKeyframes,
});
