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

const SPINNER_HALF_CIRCLE = 'spinner-half-circle';

const HALF_CIRCLE_ANIMATION = buildSpinnerAnimationName(SPINNER_HALF_CIRCLE);

const halfCircleKeyframes: CSSRules = {
  [`@keyframes ${HALF_CIRCLE_ANIMATION}`]: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};

const halfCircleCSS: CSSRules = {
  width: size,
  height: size,
  borderRadius: '100%',

  [`& > :where(.${SPINNER_ITEM})`]: {
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '100%',
    border: `calc(${size} / max(10, ${count} * 5)) solid transparent`,
    borderTopColor: 'currentColor',
    animation: `${HALF_CIRCLE_ANIMATION} ${duration} infinite`,

    '&:where(:nth-child(even))': {
      borderTopColor: 'transparent',
      borderBottomColor: 'currentColor',
      animationDirection: 'alternate',
    },

    '&:where(:nth-child(n+3))': {
      animationDelay: `calc(-1 * ${duration} * ${index} / ${count})`,
    },
  },
};

export default defineSpinner({
  name: SPINNER_HALF_CIRCLE,
  styles: halfCircleCSS,
  keyframes: halfCircleKeyframes,
});
