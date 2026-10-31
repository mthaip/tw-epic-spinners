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

const SPINNER_LOOPING_RHOMBUSES = 'spinner-looping-rhombuses';

const LOOPING_RHOMBUSES_ANIMATION = {
  MAIN: buildSpinnerAnimationName(SPINNER_LOOPING_RHOMBUSES, 'main'),
};

const loopingRhombusesKeyframes: CSSRules = {
  [`@keyframes ${LOOPING_RHOMBUSES_ANIMATION.MAIN}`]: {
    '0%': { transform: 'translateX(0) rotate(45deg) scale(0)' },
    '50%': {
      transform:
        'translateX(calc(-233% * var(--travel-scale))) rotate(45deg) scale(1)',
    },
    '100%': {
      transform:
        'translateX(calc(-466% * var(--travel-scale))) rotate(45deg) scale(0)',
    },
  },
};

const loopingRhombusesCSS: CSSRules = {
  width: size,
  height: size,

  [`& > :where(.${SPINNER_ITEM})`]: {
    '--travel-scale': `calc(max(4, ${count}) / 4)`,
    '--shape-size': `calc(${size} / max(4, ${count}))`,
    height: 'var(--shape-size)',
    width: 'var(--shape-size)',
    backgroundColor: 'currentColor',
    left: size,
    top: 'calc(50% - var(--shape-size) / 2)',
    position: 'absolute',
    margin: '0 auto',
    borderRadius: '2px',
    transform: 'translateY(0) rotate(45deg) scale(0)',
    animation: `${LOOPING_RHOMBUSES_ANIMATION.MAIN} ${duration} linear infinite`,
    animationDelay: `calc(-2 * ${duration} * (${index} + 1) / ${count})`,
  },
};

export default defineSpinner({
  name: SPINNER_LOOPING_RHOMBUSES,
  styles: loopingRhombusesCSS,
  keyframes: loopingRhombusesKeyframes,
});
