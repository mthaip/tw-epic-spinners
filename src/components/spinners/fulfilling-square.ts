import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { buildSpinnerAnimationName } from '../../utils/builder';

const SPINNER_FULFILLING_SQUARE = 'spinner-fulfilling-square';

const FULFILLING_SQUARE_ANIMATION = {
  MAIN: buildSpinnerAnimationName(SPINNER_FULFILLING_SQUARE, 'main'),
  SHAPE: buildSpinnerAnimationName(SPINNER_FULFILLING_SQUARE, 'shape'),
} as const;

const fulfillingSquareKeyframes = {
  [`@keyframes ${FULFILLING_SQUARE_ANIMATION.MAIN}`]: {
    '0%': { transform: 'rotate(0deg)' },
    '25%': { transform: 'rotate(180deg)' },
    '50%': { transform: 'rotate(180deg)' },
    '75%': { transform: 'rotate(360deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  [`@keyframes ${FULFILLING_SQUARE_ANIMATION.SHAPE}`]: {
    '0%': { height: '0%' },
    '25%': { height: '0%' },
    '50%': { height: '100%' },
    '75%': { height: '100%' },
    '100%': { height: '0%' },
  },
};

const fulfillingSquareCSS = {
  height: `var(${SPINNER_SIZE_VAR})`,
  width: `var(${SPINNER_SIZE_VAR})`,
  position: 'relative',
  border: `calc(var(${SPINNER_SIZE_VAR}) / 12.5) solid currentColor`,
  animation: `${FULFILLING_SQUARE_ANIMATION.MAIN} var(${SPINNER_DURATION_VAR}) infinite ease`,

  '&::before': {
    content: '""',
    verticalAlign: 'top',
    display: 'inline-block',
    backgroundColor: 'currentColor',
    width: '100%',
    opacity: '1',
    animation: `${FULFILLING_SQUARE_ANIMATION.SHAPE} var(${SPINNER_DURATION_VAR}) infinite ease-in`,
  },
};

const creator = (classes: string = ''): string => {
  return `
    <div class="${SPINNER_FULFILLING_SQUARE} ${classes}"></div>
  `.trim();
};

export default {
  name: SPINNER_FULFILLING_SQUARE,
  components: fulfillingSquareCSS,
  keyframes: fulfillingSquareKeyframes,
  creator,
};
