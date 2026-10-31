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

const SPINNER_TRINITY_RINGS = 'spinner-trinity-rings';

const TRINITY_RINGS_ANIMATION = {
  FIRST: buildSpinnerAnimationName(SPINNER_TRINITY_RINGS, 'first'),
  SECOND: buildSpinnerAnimationName(SPINNER_TRINITY_RINGS, 'second'),
  THIRD: buildSpinnerAnimationName(SPINNER_TRINITY_RINGS, 'third'),
} as const;

const trinityRingsKeyframes: CSSRules = {
  [`@keyframes ${TRINITY_RINGS_ANIMATION.FIRST}`]: {
    '0%': { transform: 'rotateZ(20deg) rotateY(0deg)' },
    '100%': { transform: 'rotateZ(100deg) rotateY(360deg)' },
  },
  [`@keyframes ${TRINITY_RINGS_ANIMATION.SECOND}`]: {
    '0%': { transform: 'rotateZ(100deg) rotateX(0deg)' },
    '100%': { transform: 'rotateZ(0deg) rotateX(360deg)' },
  },
  [`@keyframes ${TRINITY_RINGS_ANIMATION.THIRD}`]: {
    '0%': { transform: 'rotateZ(100deg) rotateX(-360deg)' },
    '100%': { transform: 'rotateZ(-360deg) rotateX(360deg)' },
  },
};

const trinityRingsCSS: CSSRules = {
  height: size,
  width: size,
  padding: '3px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  overflow: 'hidden',

  [`& > :where(.${SPINNER_ITEM})`]: {
    position: 'absolute',
    display: 'block',
    borderRadius: '50%',
    border: '3px solid currentColor',
    opacity: '1',

    '&:where(:nth-child(3n+1))': {
      borderWidth: `calc(${size} / 22)`,
      height: size,
      width: size,
      animation: `${TRINITY_RINGS_ANIMATION.FIRST} ${duration} infinite linear`,
    },

    '&:where(:nth-child(3n+2))': {
      borderWidth: `calc(${size} / 33)`,
      height: `calc(${size} * 0.65)`,
      width: `calc(${size} * 0.65)`,
      animation: `${TRINITY_RINGS_ANIMATION.SECOND} ${duration} infinite linear`,
    },

    '&:where(:nth-child(3n))': {
      borderWidth: `calc(${size} / 66)`,
      height: `calc(${size} * 0.1)`,
      width: `calc(${size} * 0.1)`,
      animation: `${TRINITY_RINGS_ANIMATION.THIRD} ${duration} infinite linear`,
    },

    '&:where(:nth-child(n+4))': {
      height: `calc(${size} * 3 / (${index} + 1))`,
      width: `calc(${size} * 3 / (${index} + 1))`,
      animationDelay: `calc(-1 * ${duration} * ${index} / ${count})`,
    },
  },
};

export default defineSpinner({
  name: SPINNER_TRINITY_RINGS,
  styles: trinityRingsCSS,
  keyframes: trinityRingsKeyframes,
});
