import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { CSSRuleObject } from 'tailwindcss/types/config';

const SPINNER_CIRCLES_TO_RHOMBUSES = 'spinner-circles-to-rhombuses';

const CIRCLES_TO_RHOMBUSES_ANIMATION = {
  MAIN: 'spinner-circles-to-rhombuses-animation',
};

// ! Loop does not work
const circlesToRhombusesKeyframes: CSSRuleObject | CSSRuleObject[] = {
  [`@keyframes ${CIRCLES_TO_RHOMBUSES_ANIMATION.MAIN}`]: {
    '0%': { borderRadius: '10%' },
    '17.5%': { borderRadius: '10%' },
    '50%': { borderRadius: '100%' },
    '93.5%': { borderRadius: '10%' },
    '100%': { borderRadius: '10%' },
  },
};

const circlesToRhombusesCSS = {
  height: `var(${SPINNER_SIZE_VAR})`,
  width: `calc((var(${SPINNER_SIZE_VAR}) + var(${SPINNER_SIZE_VAR}) * 1.125) * 3)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& .shape': {
    width: `var(${SPINNER_SIZE_VAR})`,
    height: `var(${SPINNER_SIZE_VAR})`,
    marginLeft: `calc(var(${SPINNER_SIZE_VAR}) * 1.125)`,
    transform: 'rotate(45deg)',
    borderRadius: '10%',
    border: `calc(var(${SPINNER_SIZE_VAR}) / 5) solid currentColor`,
    overflow: 'hidden',
    background: 'transparent',
    animation: `${CIRCLES_TO_RHOMBUSES_ANIMATION.MAIN} var(${SPINNER_DURATION_VAR}) linear infinite`,

    '&:nth-child(1)': {
      animationDelay: `calc(var(${SPINNER_DURATION_VAR}) / 8 * 1)`,
      marginLeft: '0',
    },
    '&:nth-child(2)': {
      animationDelay: `calc(var(${SPINNER_DURATION_VAR}) / 8 * 2)`,
    },
    '&:nth-child(3)': {
      animationDelay: `calc(var(${SPINNER_DURATION_VAR}) / 8 * 3)`,
    },
  },

  ...circlesToRhombusesKeyframes,
};

export default {
  name: SPINNER_CIRCLES_TO_RHOMBUSES,
  components: circlesToRhombusesCSS,
};
