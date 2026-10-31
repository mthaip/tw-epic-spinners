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

const SPINNER_FINGERPRINT = 'spinner-fingerprint';

const FINGERPRINT_ANIMATION = {
  MAIN: buildSpinnerAnimationName(SPINNER_FINGERPRINT, 'main'),
} as const;

const fingerprintKeyframes: CSSRules = {
  [`@keyframes ${FINGERPRINT_ANIMATION.MAIN}`]: {
    '100%': { transform: 'rotate( 360deg )' },
  },
};

const fingerprintCSS: CSSRules = {
  height: size,
  width: size,
  padding: '2px',
  overflow: 'hidden',

  [`& > :where(.${SPINNER_ITEM})`]: {
    position: 'absolute',
    borderRadius: '50%',
    border: `calc(${size} / max(32, ${count} * 32 / 9)) solid transparent`,
    borderTopColor: 'currentColor',
    animation: `${FINGERPRINT_ANIMATION.MAIN} ${duration} cubic-bezier(0.680, -0.750, 0.265, 1.750) infinite forwards`,
    margin: 'auto',
    bottom: '0',
    left: '0',
    right: '0',
    top: '0',
    height: `calc(${size} * (${index} + 1) / ${count})`,
    width: `calc(${size} * (${index} + 1) / ${count})`,
    animationDelay: `calc(${duration} * 0.3 * (${index} + 1) / ${count})`,
  },
};

export default defineSpinner({
  name: SPINNER_FINGERPRINT,
  styles: fingerprintCSS,
  keyframes: fingerprintKeyframes,
});
