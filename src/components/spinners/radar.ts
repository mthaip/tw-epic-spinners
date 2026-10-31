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

const SPINNER_RADAR = 'spinner-radar';

const RADAR_ANIMATION = buildSpinnerAnimationName(SPINNER_RADAR);

const radarKeyframes: CSSRules = {
  [`@keyframes ${RADAR_ANIMATION}`]: {
    '50%': { transform: 'rotate(180deg)' },
    '100%': { transform: 'rotate(0deg)' },
  },
};

const radarCSS: CSSRules = {
  width: size,
  height: size,

  [`& > :where(.${SPINNER_ITEM})`]: {
    // Flatten the old wrapper/ring pair without changing the visible ring.
    '--radar-inset': `calc(${size} * ${index} / (${count} * 2.75) + ${size} * 5 / 110)`,
    position: 'absolute',
    inset: '0',
    margin: 'auto',
    height: `calc(${size} - 2 * var(--radar-inset))`,
    width: `calc(${size} - 2 * var(--radar-inset))`,
    borderRadius: '50%',
    border: `calc(${size} * 5 / 110) solid transparent`,
    borderLeftColor: 'currentColor',
    borderRightColor: 'currentColor',
    animation: `${RADAR_ANIMATION} ${duration} infinite`,
    animationDelay: `calc(${duration} / 6.5)`,

    '&:where(:last-child)': { animationDelay: '0ms' },
  },
};

export default defineSpinner({
  name: SPINNER_RADAR,
  styles: radarCSS,
  keyframes: radarKeyframes,
});
