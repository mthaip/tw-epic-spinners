import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { buildSpinnerAnimationName } from '../../utils/builder';

const SPINNER_SPRING = 'spinner-spring';

const SPRING_ANIMATION = {
  MAIN: buildSpinnerAnimationName(SPINNER_SPRING, 'main'),
} as const;

const springKeyframes = {
  [`@keyframes ${SPRING_ANIMATION.MAIN}`]: {
    '0%': { borderWidth: `calc(var(${SPINNER_SIZE_VAR}) / 7)` },
    '25%': { borderWidth: `calc(var(${SPINNER_SIZE_VAR}) / 23.33)` },
    '50%': {
      transform: `rotate(115deg)`,
      borderWidth: `calc(var(${SPINNER_SIZE_VAR}) / 7)`,
    },
    '75%': { borderWidth: `calc(var(${SPINNER_SIZE_VAR}) / 23.33)` },
    '100%': { borderWidth: `calc(var(${SPINNER_SIZE_VAR}) / 7)` },
  },
};

const springCSS = {
  height: `var(${SPINNER_SIZE_VAR})`,
  width: `var(${SPINNER_SIZE_VAR})`,

  '& > div': {
    overflow: 'hidden',
    height: `calc(var(${SPINNER_SIZE_VAR}) / 2)`,
    width: `var(${SPINNER_SIZE_VAR})`,

    '&::before': {
      content: '""',
      display: 'block',
      width: `var(${SPINNER_SIZE_VAR})`,
      height: `var(${SPINNER_SIZE_VAR})`,
      border: `calc(var(${SPINNER_SIZE_VAR}) / 7) solid transparent`,
      borderRightColor: 'currentColor',
      borderTopColor: 'currentColor',
      borderRadius: '50%',
      boxSizing: 'border-box',
      animation: `${SPRING_ANIMATION.MAIN}  var(${SPINNER_DURATION_VAR}) ease-in-out infinite`,
      transform: 'rotate(-200deg)',
    },

    '&:nth-child(2)': {
      transform: 'rotate(180deg) scale(-1, 1)',
    },
  },
};

const creator = (classes: string = ''): string => {
  return `
    <div class="${SPINNER_SPRING} ${classes}">
      <div></div>
      <div></div>
    </div>
  `.trim();
};

export default {
  name: SPINNER_SPRING,
  components: springCSS,
  keyframes: springKeyframes,
  creator,
};
