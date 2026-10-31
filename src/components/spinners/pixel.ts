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

const SPINNER_PIXEL = 'spinner-pixel';
const PIXEL_ANIMATION = buildSpinnerAnimationName(SPINNER_PIXEL);
const PIXEL_PART_ANIMATION = buildSpinnerAnimationName(SPINNER_PIXEL, 'part');

const pixelKeyframes: CSSRules = {
  [`@keyframes ${PIXEL_ANIMATION}`]: {
    '100%': { transform: 'rotate(360deg)' },
  },
  [`@keyframes ${PIXEL_PART_ANIMATION}`]: {
    '50%, 75%': {
      transform:
        'translate(calc(var(--x) / var(--edge) * var(--expanded-distance)), calc(var(--y) / var(--edge) * var(--expanded-distance)))',
    },
  },
};

const pixelCSS: CSSRules = {
  width: size,
  height: size,
  animation: `${PIXEL_ANIMATION} ${duration} linear infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '0',
    margin: 'auto',
    height: `calc(${size} / 7)`,
    width: `calc(${size} / 7)`,
    backgroundColor: 'currentColor',
  },

  [`& > :where(.${SPINNER_ITEM})`]: {
    '--pixel-angle': `calc(45deg + 360deg * ${index} / ${count})`,
    '--x': 'cos(var(--pixel-angle))',
    '--y': 'sin(var(--pixel-angle))',
    '--edge':
      'max(var(--x), calc(-1 * var(--x)), var(--y), calc(-1 * var(--y)))',
    '--expanded-distance': `calc(${size} / 7.2)`,
    position: 'absolute',
    inset: '0',
    margin: 'auto',
    height: `calc(${size} * 8 / (max(8, ${count}) * 7))`,
    width: `calc(${size} * 8 / (max(8, ${count}) * 7))`,
    backgroundColor: 'currentColor',
    transform: `translate(calc(var(--x) / var(--edge) * ${size} / 4.7), calc(var(--y) / var(--edge) * ${size} / 4.7))`,
    animation: `${PIXEL_PART_ANIMATION} ${duration} linear infinite`,

    '&:where(:nth-child(odd))': {
      '--expanded-distance': `calc(${size} / 3.6)`,
    },
  },
};

export default defineSpinner({
  name: SPINNER_PIXEL,
  styles: pixelCSS,
  keyframes: pixelKeyframes,
});
