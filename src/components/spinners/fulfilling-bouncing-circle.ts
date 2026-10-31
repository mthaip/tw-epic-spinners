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

const SPINNER_FULFILLING_BOUNCING_CIRCLE = 'spinner-fulfilling-bouncing-circle';

const FULFILLING_BOUNCING_CIRCLE_ANIMATION = {
  MAIN: buildSpinnerAnimationName(SPINNER_FULFILLING_BOUNCING_CIRCLE, 'main'),
  FIRST: buildSpinnerAnimationName(SPINNER_FULFILLING_BOUNCING_CIRCLE, 'first'),
  SECOND: buildSpinnerAnimationName(
    SPINNER_FULFILLING_BOUNCING_CIRCLE,
    'second',
  ),
} as const;

const fulfillingBouncingCircleKeyframes: CSSRules = {
  [`@keyframes ${FULFILLING_BOUNCING_CIRCLE_ANIMATION.MAIN}`]: {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  [`@keyframes ${FULFILLING_BOUNCING_CIRCLE_ANIMATION.FIRST}`]: {
    '0%': {
      transform: 'scale(1)',
      borderColor: 'transparent',
      borderTopColor: 'currentColor',
    },
    '16.7%': {
      borderColor: 'transparent',
      borderTopColor: 'initial',
      borderRightColor: 'initial',
    },
    '33.4%': {
      borderColor: 'transparent',
      borderTopColor: 'currentColor',
      borderRightColor: 'currentColor',
      borderBottomColor: 'currentColor',
    },
    '50%': { borderColor: 'currentColor', transform: 'scale(1)' },
    '62.5%': { borderColor: 'currentColor', transform: 'scale(1.4)' },
    '75%': { borderColor: 'currentColor', transform: 'scale(1)', opacity: '1' },
    '87.5%': { borderColor: 'currentColor', transform: 'scale(1.4)' },
    '100%': {
      borderColor: 'transparent',
      borderTopColor: 'currentColor',
      transform: 'scale(1)',
    },
  },
  [`@keyframes ${FULFILLING_BOUNCING_CIRCLE_ANIMATION.SECOND}`]: {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1)' },
    '62.5%': { transform: 'scale(0.8)' },
    '75%': { transform: 'scale(1)' },
    '87.5%': { transform: 'scale(0.8)' },
    '100%': { transform: 'scale(1)' },
  },
};

const fulfillingBouncingCircleCSS: CSSRules = {
  height: size,
  width: size,
  animation: `${FULFILLING_BOUNCING_CIRCLE_ANIMATION.MAIN} infinite ${duration} ease`,
  [`& > :where(.${SPINNER_ITEM})`]: {
    display: 'block',
    position: 'absolute',
    top: '0',
    left: '0',
    width: size,
    height: size,
    borderRadius: '50%',

    '&:where(:nth-child(odd))': {
      border: `calc(${size} * 0.1) solid currentColor`,
      transform: 'rotate(0deg) scale(1)',
      animation: `${FULFILLING_BOUNCING_CIRCLE_ANIMATION.FIRST} infinite ${duration} ease`,
    },

    '&:where(:nth-child(even))': {
      border: `calc(${size} * 0.03) solid currentColor`,
      animation: `${FULFILLING_BOUNCING_CIRCLE_ANIMATION.SECOND} infinite ${duration} ease`,
    },

    '&:where(:nth-child(n+3))': {
      inset: '0',
      margin: 'auto',
      width: `calc(${size} * 2 / (${index} + 1))`,
      height: `calc(${size} * 2 / (${index} + 1))`,
      animationDelay: `calc(-1 * ${duration} * ${index} / ${count})`,
    },
  },
};

export default defineSpinner({
  name: SPINNER_FULFILLING_BOUNCING_CIRCLE,
  styles: fulfillingBouncingCircleCSS,
  keyframes: fulfillingBouncingCircleKeyframes,
});
