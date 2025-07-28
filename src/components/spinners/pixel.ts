import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { buildSpinnerAnimationName } from '../../utils/builder';

const SPINNER_PIXEL = 'spinner-pixel';

const PIXEL_ANIMATION = buildSpinnerAnimationName(SPINNER_PIXEL);

const pixelKeyframes = {
  [`@keyframes ${PIXEL_ANIMATION}`]: {
    '50%': {
      boxShadow: `
        20px 20px 0px 0px,
        -20px -20px 0px 0px,
        20px -20px 0px 0px,
        -20px 20px 0px 0px,
        0px 10px 0px 0px,
        10px 0px 0px 0px,
        -10px 0px 0px 0px,
        0px -10px 0px 0px
      `,
    },
    '75%': {
      boxShadow: `
        20px 20px 0px 0px,
        -20px -20px 0px 0px,
        20px -20px 0px 0px,
        -20px 20px 0px 0px,
        0px 10px 0px 0px,
        10px 0px 0px 0px,
        -10px 0px 0px 0px,
        0px -10px 0px 0px
      `,
    },
    '100%': { transform: 'rotate(360deg)' },
  },
};

const pixelCSS = {
  width: `var(${SPINNER_SIZE_VAR})`,
  height: `var(${SPINNER_SIZE_VAR})`,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

  '&::before': {
    content: '""',
    display: 'block',

    '--shadowFactor': `calc(var(${SPINNER_SIZE_VAR}) / 4.7)`,
    '--shadowFactorNeg': `calc(var(--shadowFactor) * -1)`,

    height: `calc(var(${SPINNER_SIZE_VAR}) / 7)`,
    width: `calc(var(${SPINNER_SIZE_VAR}) / 7)`,
    backgroundColor: 'currentColor',
    color: 'currentColor',
    boxShadow:
      'var(--shadowFactor) var(--shadowFactor) 0 0, var(--shadowFactorNeg) var(--shadowFactorNeg) 0 0, var(--shadowFactor) var(--shadowFactorNeg) 0 0, var(--shadowFactorNeg) var(--shadowFactor) 0 0, 0 var(--shadowFactor) 0 0, var(--shadowFactor) 0 0 0, var(--shadowFactorNeg) 0 0 0, 0 var(--shadowFactorNeg) 0 0',
    animation: `${PIXEL_ANIMATION} var(${SPINNER_DURATION_VAR}) linear infinite`,
  },
};

const creator = (classes: string = ''): string => {
  return `
    <div class="${SPINNER_PIXEL} ${classes}"></div>
  `.trim();
};

export default {
  name: SPINNER_PIXEL,
  components: pixelCSS,
  keyframes: pixelKeyframes,
  creator,
};
