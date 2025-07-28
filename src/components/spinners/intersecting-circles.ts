import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { buildSpinnerAnimationName } from '../../utils/builder';

const SPINNER_INTERSECTING_CIRCLES = 'spinner-intersecting-circles';

const INTERSECTING_CIRCLES_ANIMATION = {
  MAIN: buildSpinnerAnimationName(SPINNER_INTERSECTING_CIRCLES),
};

const intersectingCirclesKeyframes = {
  [`@keyframes ${INTERSECTING_CIRCLES_ANIMATION.MAIN}`]: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
};

const intersectingCirclesCSS = {
  width: `var(${SPINNER_SIZE_VAR})`,
  height: `var(${SPINNER_SIZE_VAR})`,
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

  '--halfSpinnerSize': `calc(var(${SPINNER_SIZE_VAR}) / 2)`,

  '& > div': {
    transformOrigin: 'center',
    display: 'block',
    height: 'var(--halfSpinnerSize)',
    width: 'var(--halfSpinnerSize)',
    animation: `${INTERSECTING_CIRCLES_ANIMATION.MAIN} var(${SPINNER_DURATION_VAR}) linear infinite`,

    '& > div': {
      display: 'block',
      border: `calc(var(${SPINNER_SIZE_VAR}) / 35) solid currentColor`,
      borderRadius: '50%',
      height: '100%',
      width: '100%',
      position: 'absolute',
      left: '0',
      top: '0',

      '&:nth-child(1)': {
        left: '0',
        top: '0',
      },

      '&:nth-child(2)': {
        left: 'calc(var(--halfSpinnerSize) * -0.36)',
        top: 'calc(var(--halfSpinnerSize) * 0.2)',
      },

      '&:nth-child(3)': {
        left: 'calc(var(--halfSpinnerSize) * -0.36)',
        top: 'calc(var(--halfSpinnerSize) * -0.2)',
      },

      '&:nth-child(4)': {
        left: '0',
        top: 'calc(var(--halfSpinnerSize) * -0.36)',
      },

      '&:nth-child(5)': {
        left: 'calc(var(--halfSpinnerSize) * 0.36)',
        top: 'calc(var(--halfSpinnerSize) * -0.2)',
      },

      '&:nth-child(6)': {
        left: 'calc(var(--halfSpinnerSize) * 0.36)',
        top: 'calc(var(--halfSpinnerSize) * 0.2)',
      },

      '&:nth-child(7)': {
        left: '0',
        top: 'calc(var(--halfSpinnerSize) * 0.36)',
      },
    },
  },
};

const creator = (classes: string = ''): string => {
  return `
    <div class="${SPINNER_INTERSECTING_CIRCLES} ${classes}">
      <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  `.trim();
};

export default {
  name: SPINNER_INTERSECTING_CIRCLES,
  components: intersectingCirclesCSS,
  keyframes: intersectingCirclesKeyframes,
  creator,
};
