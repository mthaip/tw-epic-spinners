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

const SPINNER_ORBIT = 'spinner-orbit';

const ORBIT_ANIMATION = {
  FIRST: buildSpinnerAnimationName(SPINNER_ORBIT, 'first'),
  SECOND: buildSpinnerAnimationName(SPINNER_ORBIT, 'second'),
  THIRD: buildSpinnerAnimationName(SPINNER_ORBIT, 'third'),
} as const;

const orbitKeyframes: CSSRules = {
  [`@keyframes ${ORBIT_ANIMATION.FIRST}`]: {
    '0%': { transform: 'rotateX(35deg) rotateY(-45deg) rotateZ(0deg)' },
    '100%': { transform: 'rotateX(35deg) rotateY(-45deg) rotateZ(360deg)' },
  },
  [`@keyframes ${ORBIT_ANIMATION.SECOND}`]: {
    '0%': { transform: 'rotateX(50deg) rotateY(10deg) rotateZ(0deg)' },
    '100%': { transform: 'rotateX(50deg) rotateY(10deg) rotateZ(360deg)' },
  },
  [`@keyframes ${ORBIT_ANIMATION.THIRD}`]: {
    '0%': { transform: 'rotateX(35deg) rotateY(55deg) rotateZ(0deg)' },
    '100%': { transform: 'rotateX(35deg) rotateY(55deg) rotateZ(360deg)' },
  },
};

const orbitCSS: CSSRules = {
  width: size,
  height: size,
  borderRadius: '50%',
  perspective: '800px',

  [`& > :where(.${SPINNER_ITEM})`]: {
    position: 'absolute',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    '--borderWidth': `calc(${size} / 18.3)`,

    // Repeat the three original roles, rather than inventing a new orbit.
    '&:where(:nth-child(3n+1))': {
      left: '0%',
      top: '0%',
      animation: `${ORBIT_ANIMATION.FIRST} ${duration} linear infinite`,
      borderBottom: 'var(--borderWidth) solid currentColor',
    },
    '&:where(:nth-child(3n+2))': {
      right: '0%',
      top: '0%',
      animation: `${ORBIT_ANIMATION.SECOND} ${duration} linear infinite`,
      borderRight: 'var(--borderWidth) solid currentColor',
    },
    '&:where(:nth-child(3n))': {
      right: '0%',
      bottom: '0%',
      animation: `${ORBIT_ANIMATION.THIRD} ${duration} 1200ms linear infinite`,
      borderTop: 'var(--borderWidth) solid currentColor',
    },
    // Additional items retain those roles, with a count-derived phase.
    '&:where(:nth-child(n+4))': {
      animationDelay: `calc(-1 * ${duration} * ${index} / ${count})`,
    },
  },
};

export default defineSpinner({
  name: SPINNER_ORBIT,
  styles: orbitCSS,
  keyframes: orbitKeyframes,
});
