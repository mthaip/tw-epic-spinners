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

const SPINNER_HOLLOW_DOTS = 'spinner-hollow-dots';

const HOLLOW_DOTS_ANIMATION = buildSpinnerAnimationName(SPINNER_HOLLOW_DOTS);

// ! Loop does not work
const hollowDotsKeyframes: CSSRules = {
  [`@keyframes ${HOLLOW_DOTS_ANIMATION}`]: {
    '50%': { transform: 'scale(1)', opacity: '1' },
    '100%': { opacity: '0' },
  },
};

const hollowDotsCSS: CSSRules = {
  height: size,
  width: size,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  [`& > :where(.${SPINNER_ITEM})`]: {
    // V2 size is the whole footprint; v1 used size for each dot.
    '--dot-size': `calc(${size} / (${count} * 2))`,
    width: 'var(--dot-size)',
    height: 'var(--dot-size)',
    flex: 'none',
    margin: '0 calc(var(--dot-size) / 2)',
    border: 'calc(var(--dot-size) / 5) solid currentColor',
    borderRadius: '50%',
    transform: 'scale(0)',
    animation: `${HOLLOW_DOTS_ANIMATION} ${duration} ease infinite`,
    animationDelay: `calc(${duration} * (${index} + 1) / ${count})`,
  },
};

export default defineSpinner({
  name: SPINNER_HOLLOW_DOTS,
  styles: hollowDotsCSS,
  keyframes: hollowDotsKeyframes,
});
