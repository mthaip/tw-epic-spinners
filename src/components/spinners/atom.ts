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

const SPINNER_ATOM = 'spinner-atom';
const ATOM_ANIMATION = buildSpinnerAnimationName(SPINNER_ATOM);

const atomKeyframes: CSSRules = {
  [`@keyframes ${ATOM_ANIMATION}`]: {
    '100%': {
      transform: 'rotateZ(var(--atom-angle)) rotateX(66deg) rotateZ(360deg)',
    },
  },
};

const atomCSS: CSSRules = {
  height: size,
  width: size,
  overflow: 'hidden',
  '&::after': {
    content: "'\\2022'",
    display: 'block',
    position: 'absolute',
    color: 'currentColor',
    fontSize: `calc(${size} * 0.5)`,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  [`& > :where(.${SPINNER_ITEM})`]: {
    '--atom-angle': `calc(360deg * (${index} + 1) / ${count})`,
    position: 'absolute',
    display: 'block',
    height: '100%',
    width: '100%',
    borderRadius: '50%',
    border: '0 solid transparent',
    borderLeftWidth: `calc(${size} / 25)`,
    borderTopWidth: `calc(${size} / 25)`,
    borderLeftColor: 'currentColor',
    animation: `${ATOM_ANIMATION} ${duration} linear infinite`,
    transform: 'rotateZ(var(--atom-angle)) rotateX(66deg) rotateZ(0deg)',
  },
};

export default defineSpinner({
  name: SPINNER_ATOM,
  styles: atomCSS,
  keyframes: atomKeyframes,
});
