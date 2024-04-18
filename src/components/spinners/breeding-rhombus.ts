import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { CSSRuleObject } from 'tailwindcss/types/config';

const SPINNER_BREEDING_RHOMBUS = 'spinner-breeding-rhombus';

const BREEDING_RHOMBUS_ANIMATION = {
  MAIN: 'breeding-rhombus-spinner-animation',
  SHAPE: 'breeding-rhombus-spinner-animation-shape',
};

const childTransforms = [
  [-325, -325],
  [0, -325],
  [325, -325],
  [325, 0],
  [325, 325],
  [0, 325],
  [-325, 325],
  [-325, 0],
];

const breedingRhombusCircleKeyframes: CSSRuleObject | CSSRuleObject[] = {
  [`@keyframes ${BREEDING_RHOMBUS_ANIMATION.MAIN}`]: {
    '50%': { transform: 'scale(0.5)' },
  },
  ...childTransforms.reduce((prev, [x, y], index) => {
    return {
      ...prev,
      [`@keyframes ${BREEDING_RHOMBUS_ANIMATION.SHAPE}-${index + 1}`]: {
        '50%': { transform: `translate(${x}%, ${y}%)` },
      },
    };
  }, {}),
};

const buildNthChilds = () => {
  const result: {
    [k: `&:nth-child(${number})`]: CSSRuleObject | CSSRuleObject[];
  } = {};

  for (let i = 0; i < childTransforms.length; i++) {
    result[`&:nth-child(${i + 1})`] = {
      animation: `${BREEDING_RHOMBUS_ANIMATION.SHAPE}-${i + 1} var(${SPINNER_DURATION_VAR}) infinite calc(var(${SPINNER_DURATION_VAR}) / 20 * ${i + 1})`,
    };
  }

  return result;
};

const breedingRhombusCircleCSS = {
  width: `var(${SPINNER_SIZE_VAR})`,
  height: `var(${SPINNER_SIZE_VAR})`,
  position: 'relative',
  transform: 'rotate(45deg)',

  '&::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    height: `calc(var(${SPINNER_SIZE_VAR}) / 3)`,
    width: `calc(var(${SPINNER_SIZE_VAR}) / 3)`,
    top: `calc(var(${SPINNER_SIZE_VAR}) / 3)`,
    left: `calc(var(${SPINNER_SIZE_VAR}) / 3)`,
    backgroundColor: 'currentColor',
    animation: `${BREEDING_RHOMBUS_ANIMATION.MAIN} var(${SPINNER_DURATION_VAR}) infinite calc(var(${SPINNER_DURATION_VAR}) / 4)`,
  },

  '& > div': {
    height: `calc(var(${SPINNER_SIZE_VAR}) / 7.5)`,
    width: `calc(var(${SPINNER_SIZE_VAR}) / 7.5)`,
    top: `calc(var(${SPINNER_SIZE_VAR}) / 2.3077)`,
    left: `calc(var(${SPINNER_SIZE_VAR}) / 2.3077)`,
    position: 'absolute',
    backgroundColor: 'currentColor',

    '&:nth-child(2n+0)': { marginRight: '0' },

    ...buildNthChilds(),
  },

  ...breedingRhombusCircleKeyframes,
};

export default {
  name: SPINNER_BREEDING_RHOMBUS,
  components: breedingRhombusCircleCSS,
};
