import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { buildSpinnerAnimationName } from '../../utils/builder';

const SPINNER_TRINITY_RINGS = 'spinner-trinity-rings';

const TRINITY_RINGS_ANIMATION = {
  FIRST: buildSpinnerAnimationName(SPINNER_TRINITY_RINGS, 'first'),
  SECOND: buildSpinnerAnimationName(SPINNER_TRINITY_RINGS, 'second'),
  THIRD: buildSpinnerAnimationName(SPINNER_TRINITY_RINGS, 'third'),
} as const;

const trinityRingsKeyframes = {
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

  '& > div': {
    position: 'absolute',
    display: 'block',
    borderRadius: '50%',
    border: '3px solid currentColor',
    opacity: '1',

    '&:nth-child(1)': {
      borderWidth: `calc(var(${SPINNER_SIZE_VAR}) / 22)`,
      height: `var(${SPINNER_SIZE_VAR})`,
      width: `var(${SPINNER_SIZE_VAR})`,
      animation: `${TRINITY_RINGS_ANIMATION.FIRST} var(${SPINNER_DURATION_VAR}) infinite linear`,
    },

    '&:nth-child(2)': {
      borderWidth: `calc(var(${SPINNER_SIZE_VAR}) / 33)`,
      height: `calc(var(${SPINNER_SIZE_VAR}) * 0.65)`,
      width: `calc(var(${SPINNER_SIZE_VAR}) * 0.65)`,
      animation: `${TRINITY_RINGS_ANIMATION.SECOND} var(${SPINNER_DURATION_VAR}) infinite linear`,
    },

    '&:nth-child(3)': {
      borderWidth: `calc(var(${SPINNER_SIZE_VAR}) / 66)`,
      height: `calc(var(${SPINNER_SIZE_VAR}) * 0.1)`,
      width: `calc(var(${SPINNER_SIZE_VAR}) * 0.1)`,
      animation: `${TRINITY_RINGS_ANIMATION.THIRD} var(${SPINNER_DURATION_VAR}) infinite linear`,
    },
  },
};

const creator = (classes: string = ''): string => {
  return `
    <div class="${SPINNER_TRINITY_RINGS} ${classes}">
      <div></div>
      <div></div>
      <div></div>
    </div>
  `.trim();
};

export default {
  name: SPINNER_TRINITY_RINGS,
  components: trinityRingsCSS,
  keyframes: trinityRingsKeyframes,
  creator,
};
