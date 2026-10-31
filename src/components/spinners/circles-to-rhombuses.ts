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

const SPINNER_CIRCLES_TO_RHOMBUSES = 'spinner-circles-to-rhombuses';

const CIRCLES_TO_RHOMBUSES_ANIMATION = {
  MAIN: buildSpinnerAnimationName(SPINNER_CIRCLES_TO_RHOMBUSES, 'main'),
} as const;

// ! Loop does not work
const circlesToRhombusesKeyframes: CSSRules = {
  [`@keyframes ${CIRCLES_TO_RHOMBUSES_ANIMATION.MAIN}`]: {
    '0%': { borderRadius: '10%' },
    '17.5%': { borderRadius: '10%' },
    '50%': { borderRadius: '100%' },
    '93.5%': { borderRadius: '10%' },
    '100%': { borderRadius: '10%' },
  },
};

const circlesToRhombusesCSS: CSSRules = {
  height: size,
  width: size,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  [`& > :where(.${SPINNER_ITEM})`]: {
    '--shape-size': `calc(${size} / (2.125 * ${count}))`,
    width: 'var(--shape-size)',
    height: 'var(--shape-size)',
    flex: 'none',
    marginLeft: 'calc(var(--shape-size) * 1.125)',
    transform: 'rotate(45deg)',
    borderRadius: '10%',
    border: 'calc(var(--shape-size) / 5) solid currentColor',
    overflow: 'hidden',
    background: 'transparent',
    animation: `${CIRCLES_TO_RHOMBUSES_ANIMATION.MAIN} ${duration} linear infinite`,
    animationDelay: `calc(${duration} * 0.375 * (${index} + 1) / ${count})`,

    '&:where(:first-child)': { marginLeft: '0' },
  },
};

export default defineSpinner({
  name: SPINNER_CIRCLES_TO_RHOMBUSES,
  styles: circlesToRhombusesCSS,
  keyframes: circlesToRhombusesKeyframes,
});
