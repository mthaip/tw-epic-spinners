import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { CSSRuleObject } from 'tailwindcss/types/config';

const SPINNER_ORBIT = 'spinner-orbit';

const ORBIT_ANIMATION = {
  FIRST: 'orbit-spinner-orbit-one-animation',
  SECOND: 'orbit-spinner-orbit-two-animation',
  THIRD: 'orbit-spinner-orbit-three-animation',
};

const orbitKeyframes: CSSRuleObject | CSSRuleObject[] = {
  [`@keyframes ${ORBIT_ANIMATION.FIRST}`]: {
    '0%': { transform: 'rotateX(35deg) rotateY(-45deg) rotateZ(0deg)' },
    '100%': { transform: 'rotateX(35deg) rotateY(-45deg) rotateZ(360deg)' },
  },
  [`@keyframes ${ORBIT_ANIMATION.SECOND}`]: {
    '0%': { transform: 'rotateX(50deg) rotateY(10deg) rotateZ(0deg)' },
    '100%': { transform: 'rotateX(50deg) rotateY(10deg) rotateZ(360deg)' },
  },
  [`@keyframes ${ORBIT_ANIMATION.THIRD}`]: {
    '0%': { transform: 'rotateX(35deg) rotateY(55deg) rotateZ(0deg)' },
    '100%': { transform: 'rotateX(35deg) rotateY(55deg) rotateZ(360deg)' },
  },
};

const orbitCSS = {
  width: `var(${SPINNER_SIZE_VAR})`,
  height: `var(${SPINNER_SIZE_VAR})`,
  borderRadius: '50%',
  perspective: '800px', // ? what is this

  '& .shape': {
    position: 'absolute',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    borderRadius: '50%',

    '--borderWidth': `calc(var(${SPINNER_SIZE_VAR}) / 18.3)`,

    '&:nth-child(1)': {
      left: '0%',
      top: '0%',
      animation: `${ORBIT_ANIMATION.FIRST} var(${SPINNER_DURATION_VAR}) linear infinite`,
      borderBottom: 'var(--borderWidth) solid currentColor',
    },
    '&:nth-child(2)': {
      right: '0%',
      top: '0%',
      animation: `${ORBIT_ANIMATION.SECOND} var(${SPINNER_DURATION_VAR}) linear infinite`,
      borderRight: 'var(--borderWidth) solid currentColor',
    },
    '&:nth-child(3)': {
      right: '0%',
      bottom: '0%',
      animation: `${ORBIT_ANIMATION.THIRD} var(${SPINNER_DURATION_VAR}) 1200ms linear infinite`,
      borderTop: 'var(--borderWidth) solid currentColor',
    },
  },

  ...orbitKeyframes,
};

export default {
  name: SPINNER_ORBIT,
  components: orbitCSS,
};
