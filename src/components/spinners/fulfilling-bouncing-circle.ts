import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { buildSpinnerAnimationName } from '../../utils/builder';

const SPINNER_FULFILLING_BOUNCING_CIRCLE = 'spinner-fulfilling-bouncing-circle';

const FULFILLING_BOUNCING_CIRCLE_ANIMATION = {
  MAIN: buildSpinnerAnimationName(SPINNER_FULFILLING_BOUNCING_CIRCLE, 'main'),
  FIRST: buildSpinnerAnimationName(SPINNER_FULFILLING_BOUNCING_CIRCLE, 'first'),
  SECOND: buildSpinnerAnimationName(
    SPINNER_FULFILLING_BOUNCING_CIRCLE,
    'second',
  ),
} as const;

const fulfillingBouncingCircleKeyframes = {
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

const fulfillingBouncingCircleCSS = {
  height: `var(${SPINNER_SIZE_VAR})`,
  width: `var(${SPINNER_SIZE_VAR})`,
  position: 'relative',
  animation: `${FULFILLING_BOUNCING_CIRCLE_ANIMATION.MAIN} infinite var(${SPINNER_DURATION_VAR}) ease`,

  '&::before, &::after': {
    content: '""',
    display: 'block',
  },

  '&::before': {
    height: `var(${SPINNER_SIZE_VAR})`,
    width: `var(${SPINNER_SIZE_VAR})`,
    border: `calc(var(${SPINNER_SIZE_VAR}) * 0.1) solid currentColor`,
    color: 'currentColor',
    display: 'block',
    borderRadius: '50%',
    position: 'relative',
    transform: 'rotate(0deg) scale(1)',
    animation: `${FULFILLING_BOUNCING_CIRCLE_ANIMATION.FIRST} infinite var(${SPINNER_DURATION_VAR}) ease`,
  },

  '&::after': {
    height: `var(${SPINNER_SIZE_VAR})`,
    width: `var(${SPINNER_SIZE_VAR})`,
    border: `calc(var(${SPINNER_SIZE_VAR}) * 0.03) solid currentColor`,
    position: 'absolute',
    top: '0',
    left: '0',
    borderRadius: '50%',
    animation: `${FULFILLING_BOUNCING_CIRCLE_ANIMATION.SECOND} infinite var(${SPINNER_DURATION_VAR}) ease`,
  },
};

const creator = (classes: string = ''): string => {
  return `
    <div class="${SPINNER_FULFILLING_BOUNCING_CIRCLE} ${classes}"></div>
  `.trim();
};

export default {
  name: SPINNER_FULFILLING_BOUNCING_CIRCLE,
  components: fulfillingBouncingCircleCSS,
  keyframes: fulfillingBouncingCircleKeyframes,
  creator,
};
