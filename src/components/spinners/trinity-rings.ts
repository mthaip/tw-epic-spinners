import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { CSSRuleObject } from 'tailwindcss/types/config';

const SPINNER_TRINITY_RINGS = 'spinner-trinity-rings';

const TRINITY_RINGS_ANIMATION = {
  FIRST: 'trinity-rings-spinner-circle1-animation',
  SECOND: 'trinity-rings-spinner-circle2-animation',
  THIRD: 'trinity-rings-spinner-circle3-animation',
};

const trinityRingsKeyframes: CSSRuleObject | CSSRuleObject[] = {
  [`@keyframes ${TRINITY_RINGS_ANIMATION.FIRST}`]: {
    '0%': { transform: 'rotateZ(20deg) rotateY(0deg)' },
    '100%': { transform: 'rotateZ(100deg) rotateY(360deg)' },
  },
  [`@keyframes ${TRINITY_RINGS_ANIMATION.SECOND}`]: {
    '0%': { transform: 'rotateZ(100deg) rotateX(0deg)' },
    '100%': { transform: 'rotateZ(0deg) rotateX(360deg)' },
  },
  [`@keyframes ${TRINITY_RINGS_ANIMATION.THIRD}`]: {
    '0%': { transform: 'rotateZ(100deg) rotateX(-360deg)' },
    '100%': { transform: 'rotateZ(-360deg) rotateX(360deg)' },
  },
};

const trinityRingsCSS = {
  height: `var(${SPINNER_SIZE_VAR})`,
  width: `var(${SPINNER_SIZE_VAR})`,
  padding: '3px',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  overflow: 'hidden',
  boxSizing: 'border-box',

  '& .shape': {
    position: 'absolute',
    display: 'block',
    borderRadius: '50%',
    border: '3px solid currentColor',
    opacity: '1',

    '&:nth-child(1)': {
      borderWidth: '3px',
      height: `var(${SPINNER_SIZE_VAR})`,
      width: `var(${SPINNER_SIZE_VAR})`,
      animation: `${TRINITY_RINGS_ANIMATION.FIRST} var(${SPINNER_DURATION_VAR}) infinite linear`,
    },

    '&:nth-child(2)': {
      borderWidth: '2px',
      height: `calc(var(${SPINNER_SIZE_VAR}) * 0.65)`,
      width: `calc(var(${SPINNER_SIZE_VAR}) * 0.65)`,
      animation: `${TRINITY_RINGS_ANIMATION.SECOND} var(${SPINNER_DURATION_VAR}) infinite linear`,
    },

    '&:nth-child(3)': {
      borderWidth: '1px',
      height: `calc(var(${SPINNER_SIZE_VAR}) * 0.1)`,
      width: `calc(var(${SPINNER_SIZE_VAR}) * 0.1)`,
      animation: `${TRINITY_RINGS_ANIMATION.THIRD} var(${SPINNER_DURATION_VAR}) infinite linear`,
    },
  },

  ...trinityRingsKeyframes,
};

export default {
  name: SPINNER_TRINITY_RINGS,
  components: trinityRingsCSS,
};
