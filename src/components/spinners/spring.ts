import type { CSSRules } from '../../types';
import { defineSpinner } from '../base';
import {
  size,
  duration,
  count,
  buildSpinnerAnimationName,
  SPINNER_ITEM,
} from '../../utils/builder';

const SPINNER_SPRING = 'spinner-spring';

const SPRING_ANIMATION = {
  MAIN: buildSpinnerAnimationName(SPINNER_SPRING, 'main'),
} as const;

const springKeyframes: CSSRules = {
  [`@keyframes ${SPRING_ANIMATION.MAIN}`]: {
    '0%': { borderWidth: `calc(${size} / 7)` },
    '25%': { borderWidth: `calc(${size} / 23.33)` },
    '50%': {
      transform: `rotate(115deg)`,
      borderWidth: `calc(${size} / 7)`,
    },
    '75%': { borderWidth: `calc(${size} / 23.33)` },
    '100%': { borderWidth: `calc(${size} / 7)` },
  },
};

const springCSS: CSSRules = {
  height: size,
  width: size,

  [`& > :where(.${SPINNER_ITEM})`]: {
    overflow: 'hidden',
    height: `calc(${size} / ${count})`,
    width: size,

    '&::before': {
      content: '""',
      display: 'block',
      width: size,
      height: size,
      border: `calc(${size} / 7) solid transparent`,
      borderRightColor: 'currentColor',
      borderTopColor: 'currentColor',
      borderRadius: '50%',
      boxSizing: 'border-box',
      animation: `${SPRING_ANIMATION.MAIN} ${duration} ease-in-out infinite`,
      transform: 'rotate(-200deg)',
    },

    '&:where(:nth-child(even))': { transform: 'rotate(180deg) scale(-1, 1)' },
  },
};

export default defineSpinner({
  name: SPINNER_SPRING,
  styles: springCSS,
  keyframes: springKeyframes,
});
