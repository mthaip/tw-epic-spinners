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

const SPINNER_SEMIPOLAR = 'spinner-semipolar';

const SEMIPOLAR_ANIMATION = {
  MAIN: buildSpinnerAnimationName(SPINNER_SEMIPOLAR, 'main'),
} as const;

const semipolarKeyframes: CSSRules = {
  [`@keyframes ${SEMIPOLAR_ANIMATION.MAIN}`]: {
    '50%': { transform: 'rotate(360deg) scale(0.7)' },
  },
};

const semipolarCSS: CSSRules = {
  width: size,
  height: size,

  [`& > :where(.${SPINNER_ITEM})`]: {
    position: 'absolute',
    borderRadius: '50%',
    border: `calc(${size} / max(20, ${count} * 4)) solid transparent`,
    borderTopColor: 'currentColor',
    borderLeftColor: 'currentColor',
    animation: `${SEMIPOLAR_ANIMATION.MAIN} ${duration} infinite`,
    height: `calc(${size} * (1 - ${index} / ${count}))`,
    width: `calc(${size} * (1 - ${index} / ${count}))`,
    top: `calc(${size} * ${index} / ${count} / 2)`,
    left: `calc(${size} * ${index} / ${count} / 2)`,
    animationDelay: `calc(${duration} * 0.5 * (${count} - ${index} - 1) / ${count})`,
    zIndex: `calc(${count} - ${index})`,
  },
};

export default defineSpinner({
  name: SPINNER_SEMIPOLAR,
  styles: semipolarCSS,
  keyframes: semipolarKeyframes,
});
