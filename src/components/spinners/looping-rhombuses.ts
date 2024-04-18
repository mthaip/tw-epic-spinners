import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { CSSRuleObject } from 'tailwindcss/types/config';

const SPINNER_FULFILLING_BOUNCING = 'spinner-looping-rhombuses';

const FULFILLING_BOUNCING_ANIMATION = {
  MAIN: 'looping-rhombuses-spinner-animation',
};

const loopingRhombusesCircleKeyframes: CSSRuleObject | CSSRuleObject[] = {
  [`@keyframes ${FULFILLING_BOUNCING_ANIMATION.MAIN}`]: {
    '0%': { transform: 'translateX(0) rotate(45deg) scale(0)' },
    '50%': { transform: 'translateX(-233%) rotate(45deg) scale(1)' },
    '100%': { transform: 'translateX(-466%) rotate(45deg) scale(0)' },
  },
};

const buildNthChilds = () => {
  const result: {
    [k: `&:nth-child(${number})`]: CSSRuleObject | CSSRuleObject[];
  } = {};

  for (let i = 0; i < 3; i++) {
    result[`&:nth-child(${i + 1})`] = {
      animationDelay: `calc(var(${SPINNER_DURATION_VAR}) * ${i + 1} / -1.5)`,
    };
  }

  return result;
};

const loopingRhombusesCircleCSS = {
  width: `calc(var(${SPINNER_SIZE_VAR}) * 4)`,
  height: `var(${SPINNER_SIZE_VAR})`,
  position: 'relative',

  '& > div': {
    height: `var(${SPINNER_SIZE_VAR})`,
    width: `var(${SPINNER_SIZE_VAR})`,
    backgroundColor: 'currentColor',
    left: `calc(var(${SPINNER_SIZE_VAR}) * 4)`,
    position: 'absolute',
    margin: '0 auto',
    borderRadius: '2px',
    transform: 'translateY(0) rotate(45deg) scale(0)',
    animation: `${FULFILLING_BOUNCING_ANIMATION.MAIN} var(${SPINNER_DURATION_VAR}) linear infinite`,

    ...buildNthChilds(),
  },

  ...loopingRhombusesCircleKeyframes,
};

export default {
  name: SPINNER_FULFILLING_BOUNCING,
  components: loopingRhombusesCircleCSS,
};
