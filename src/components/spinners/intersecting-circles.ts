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

const SPINNER_INTERSECTING_CIRCLES = 'spinner-intersecting-circles';

const INTERSECTING_CIRCLES_ANIMATION = {
  MAIN: buildSpinnerAnimationName(SPINNER_INTERSECTING_CIRCLES),
};

const intersectingCirclesKeyframes: CSSRules = {
  [`@keyframes ${INTERSECTING_CIRCLES_ANIMATION.MAIN}`]: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
};

const intersectingCirclesCSS: CSSRules = {
  width: size,
  height: size,
  animation: `${INTERSECTING_CIRCLES_ANIMATION.MAIN} ${duration} linear infinite`,

  [`& > :where(.${SPINNER_ITEM})`]: {
    '--circle-radius-x': `calc(${size} * 0.18 / cos(30deg))`,
    '--circle-radius-y': `calc(${size} * 0.2)`,
    '--circle-angle': `calc(150deg + 360deg * (${index} - 1) / max(1, ${count} - 1))`,
    position: 'absolute',
    inset: '0',
    margin: 'auto',
    height: `calc(${size} / 2)`,
    width: `calc(${size} / 2)`,
    border: `calc(${size} / 35) solid currentColor`,
    borderRadius: '50%',
    // V1 has a centre circle and six outer circles. Only the outer ring grows.
    transform: `translate(calc(cos(var(--circle-angle)) * var(--circle-radius-x)), calc(sin(var(--circle-angle)) * var(--circle-radius-y)))`,

    '&:where(:nth-child(3n+1))': {
      '--circle-radius-y': `calc(${size} * 0.18)`,
    },

    '&:where(:first-child)': { transform: 'none' },
  },
};

export default defineSpinner({
  name: SPINNER_INTERSECTING_CIRCLES,
  styles: intersectingCirclesCSS,
  keyframes: intersectingCirclesKeyframes,
});
