import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { CSSRuleObject } from 'tailwindcss/types/config';

const SPINNER_FINGERPRINT = 'spinner-fingerprint';

const FINGERPRINT_ANIMATION = {
  MAIN: 'fingerprint-spinner-animation',
};

const fingerprintKeyframes: CSSRuleObject | CSSRuleObject[] = {
  [`@keyframes ${FINGERPRINT_ANIMATION.MAIN}`]: {
    '100%': { transform: 'rotate( 360deg )' },
  },
};

const buildNthChilds = () => {
  const result: {
    [k: `&:nth-child(${number})`]: CSSRuleObject | CSSRuleObject[];
  } = {};

  for (let i = 0; i < 9; i++) {
    result[`&:nth-child(${i + 1})`] = {
      height: `calc(var(${SPINNER_SIZE_VAR}) / 9 + ${i} * var(${SPINNER_SIZE_VAR}) / 9)`,
      width: `calc(var(${SPINNER_SIZE_VAR}) / 9 + ${i} * var(${SPINNER_SIZE_VAR}) / 9)`,
      animationDelay: `calc(var(${SPINNER_DURATION_VAR}) / 30 * ${i + 1})`,
    };
  }

  return result;
};

const fingerprintCSS = {
  height: `var(${SPINNER_SIZE_VAR})`,
  width: `var(${SPINNER_SIZE_VAR})`,
  padding: '2px', // ? rem
  overflow: 'hidden',
  position: 'relative',

  '& .shape': {
    position: 'absolute',
    borderRadius: '50%',
    border: '2px solid transparent',
    borderTopColor: 'currentColor',
    animation: `${FINGERPRINT_ANIMATION.MAIN} var(${SPINNER_DURATION_VAR}) cubic-bezier(0.680, -0.750, 0.265, 1.750) infinite forwards`,
    margin: 'auto',
    bottom: '0',
    left: '0',
    right: '0',
    top: '0',

    ...buildNthChilds(),
  },

  ...fingerprintKeyframes,
};

export default { name: SPINNER_FINGERPRINT, components: fingerprintCSS };
