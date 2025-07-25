import { buildSpinnerAnimationName } from '../../utils/builder';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { SPINNER_SIZE_VAR } from '../utilities/sizes';

const SPINNER_FLOWER = 'spinner-flower';

const FLOWER_ANIMATION = {
  BIGGER_DOT: buildSpinnerAnimationName(SPINNER_FLOWER, 'bigger-dot'),
  SMALLER_DOT: buildSpinnerAnimationName(SPINNER_FLOWER, 'smaller-dot'),
  __FACTOR_1: `calc(var(${SPINNER_SIZE_VAR}) / 2.7)`,
  __FACTOR_2: `calc(var(${SPINNER_SIZE_VAR}) / 3.7)`,
  __FACTOR_3: `calc(var(${SPINNER_SIZE_VAR}) / 5)`,
  __FACTOR_4: `calc(var(${SPINNER_SIZE_VAR}) / 7)`,
} as const;

const flowerKeyframes = {
  [`@keyframes ${FLOWER_ANIMATION.BIGGER_DOT}`]: {
    '0%, 100%': {
      boxShadow: `
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px
      `,
    },
    '50%': { transform: 'rotate(180deg)' },
    '25%, 75%': {
      boxShadow: `
        currentColor ${FLOWER_ANIMATION.__FACTOR_1} 0px 0px,
        currentColor calc(${FLOWER_ANIMATION.__FACTOR_1} * -1) 0px 0px,
        currentColor 0px ${FLOWER_ANIMATION.__FACTOR_1} 0px,
        currentColor 0px calc(${FLOWER_ANIMATION.__FACTOR_1} * -1) 0px,
        currentColor ${FLOWER_ANIMATION.__FACTOR_2} calc(${FLOWER_ANIMATION.__FACTOR_2} * -1) 0px,
        currentColor ${FLOWER_ANIMATION.__FACTOR_2} ${FLOWER_ANIMATION.__FACTOR_2} 0px,
        currentColor calc(${FLOWER_ANIMATION.__FACTOR_2} * -1) calc(${FLOWER_ANIMATION.__FACTOR_2} * -1) 0px,
        currentColor calc(${FLOWER_ANIMATION.__FACTOR_2} * -1) ${FLOWER_ANIMATION.__FACTOR_2} 0px
      `,
    },
    '100%': {
      transform: 'rotate(360deg)',
      boxShadow: `
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px
      `,
    },
  },
  [`@keyframes ${FLOWER_ANIMATION.SMALLER_DOT}`]: {
    '0%, 100%': {
      boxShadow: `
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px
      `,
    },
    '25%, 75%': {
      boxShadow: `
        currentColor ${FLOWER_ANIMATION.__FACTOR_3} 0px 0px,
        currentColor calc(${FLOWER_ANIMATION.__FACTOR_3} * -1) 0px 0px,
        currentColor 0px ${FLOWER_ANIMATION.__FACTOR_3} 0px,
        currentColor 0px calc(${FLOWER_ANIMATION.__FACTOR_3} * -1) 0px,
        currentColor ${FLOWER_ANIMATION.__FACTOR_4} calc(${FLOWER_ANIMATION.__FACTOR_4} * -1) 0px,
        currentColor ${FLOWER_ANIMATION.__FACTOR_4} ${FLOWER_ANIMATION.__FACTOR_4} 0px,
        currentColor calc(${FLOWER_ANIMATION.__FACTOR_4} * -1) calc(${FLOWER_ANIMATION.__FACTOR_4} * -1) 0px,
        currentColor calc(${FLOWER_ANIMATION.__FACTOR_4} * -1) ${FLOWER_ANIMATION.__FACTOR_4} 0px
      `,
    },
    '100%': {
      boxShadow: `
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px,
        currentColor 0px 0px 0px
      `,
    },
  },
};

const flowerCSS = {
  height: `var(${SPINNER_SIZE_VAR})`,
  width: `var(${SPINNER_SIZE_VAR})`,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  '& > div': {
    height: `calc(var(${SPINNER_SIZE_VAR}) / 7)`,
    width: `calc(var(${SPINNER_SIZE_VAR}) / 7)`,

    '& > div': {
      backgroundColor: 'currentColor',
      height: '100%',
      width: '100%',
      padding: '10%',
      borderRadius: '50%',
      animation: `${FLOWER_ANIMATION.BIGGER_DOT} var(${SPINNER_DURATION_VAR}) 0s infinite both`,

      '&::before': {
        content: '""',
        display: 'block',
        backgroundColor: 'currentColor',
        height: '100%',
        width: '100%',
        borderRadius: '50%',
        animation: `${FLOWER_ANIMATION.SMALLER_DOT} var(${SPINNER_DURATION_VAR}) 0s infinite both`,
      },
    },
  },
};

const creator = (classes: string = ''): string => {
  return `
    <div class="${SPINNER_FLOWER} ${classes}">
      <div>
        <div></div>
      </div>
    </div>
  `.trim();
};

export default {
  name: SPINNER_FLOWER,
  components: flowerCSS,
  keyframes: flowerKeyframes,
  creator,
};
