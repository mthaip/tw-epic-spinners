import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { buildSpinnerAnimationName } from '../../utils/builder';

const SPINNER_RADAR = 'spinner-radar';

const RADAR_ANIMATION = buildSpinnerAnimationName(SPINNER_RADAR);

const radarKeyframes = {
  [`@keyframes ${RADAR_ANIMATION}`]: {
    '50%': { transform: 'rotate(180deg)' },
    '100%': { transform: 'rotate(0deg)' },
  },
};

const radarCSS = {
  width: `var(${SPINNER_SIZE_VAR})`,
  height: `var(${SPINNER_SIZE_VAR})`,
  position: 'relative',

  '& > div': {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '0',
    left: '0',
    animation: `${RADAR_ANIMATION} var(${SPINNER_DURATION_VAR}) infinite`,

    '&:nth-child(1)': {
      padding: `calc(var(${SPINNER_SIZE_VAR}) * 5 * 2 * 0 / 110)`,
      animationDelay: `calc(var(${SPINNER_DURATION_VAR}) / 6.5)`,
    },

    '&:nth-child(2)': {
      padding: `calc(var(${SPINNER_SIZE_VAR}) * 5 * 2 * 1 / 110)`,
      animationDelay: `calc(var(${SPINNER_DURATION_VAR}) / 6.5)`,
    },

    '&:nth-child(3)': {
      padding: `calc(var(${SPINNER_SIZE_VAR}) * 5 * 2 * 2 / 110)`,
      animationDelay: `calc(var(${SPINNER_DURATION_VAR}) / 6.5)`,
    },

    '&:nth-child(4)': {
      padding: `calc(var(${SPINNER_SIZE_VAR}) * 5 * 2 * 3 / 110)`,
      animationDelay: '0ms',
    },

    '& > div, & > div::after': {
      display: 'inline-block',
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      border: `calc(var(${SPINNER_SIZE_VAR}) * 5 / 110) solid transparent`,
    },

    '& > div::after': {
      content: '""',
      borderLeftColor: 'currentColor',
      borderRightColor: 'currentColor',
    },
  },
};

const creator = (classes: string = ''): string => {
  return `
    <div class="${SPINNER_RADAR} ${classes}">
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  `.trim();
};

export default {
  name: SPINNER_RADAR,
  components: radarCSS,
  keyframes: radarKeyframes,
  creator,
};
