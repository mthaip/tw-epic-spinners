import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { CSSRuleObject } from 'tailwindcss/types/config';

const SPINNER_SELF_BUILDING_SQUARE = 'spinner-self-building-square';

const SELF_BUILDING_SQUARE_ANIMATION = {
  MAIN: 'animation-self-building-square',
};

const selfBuildingSquareKeyframes: CSSRuleObject | CSSRuleObject[] = {
  [`@keyframes ${SELF_BUILDING_SQUARE_ANIMATION.MAIN}`]: {
    '0%': { opacity: '0' },
    '5%': { opacity: '1', top: '0' },
    '50.9%': { opacity: '1', top: '0' },
    '55.9%': { opacity: '0', top: 'inherit' },
  },
};

const selfBuildingSquareCSS = {
  '--shapeSize': `calc(var(${SPINNER_SIZE_VAR}) / 4)`,
  '--shapeDelay': `calc(var(${SPINNER_DURATION_VAR}) / 20)`,

  width: `var(${SPINNER_SIZE_VAR})`,
  height: `var(${SPINNER_SIZE_VAR})`,
  top: 'calc(var(--shapeSize) * -1 * 2 / 3)',

  '& > div': {
    height: 'var(--shapeSize)',
    width: 'var(--shapeSize)',
    top: 'calc(var(--shapeSize) * -1 * 2 / 3)',
    marginRight: 'calc(var(--shapeSize) / 3)',
    marginTop: 'calc(var(--shapeSize) / 3)',
    background: 'currentColor',
    cssFloat: 'left',
    position: 'relative',
    opacity: '0',
    animation: `${SELF_BUILDING_SQUARE_ANIMATION.MAIN} var(${SPINNER_DURATION_VAR}) infinite`,

    '&:nth-child(1)': {
      animationDelay: 'calc(var(--shapeDelay) * 6)',
    },

    '&:nth-child(2)': {
      animationDelay: 'calc(var(--shapeDelay) * 7)',
    },

    '&:nth-child(3)': {
      animationDelay: 'calc(var(--shapeDelay) * 8)',
    },

    '&:nth-child(4)': {
      animationDelay: 'calc(var(--shapeDelay) * 3)',
      clear: 'both',
    },

    '&:nth-child(5)': {
      animationDelay: 'calc(var(--shapeDelay) * 4)',
    },

    '&:nth-child(6)': {
      animationDelay: 'calc(var(--shapeDelay) * 5)',
    },

    '&:nth-child(7)': {
      animationDelay: 'calc(var(--shapeDelay) * 0)',
      clear: 'both',
    },

    '&:nth-child(8)': {
      animationDelay: 'calc(var(--shapeDelay) * 1)',
    },

    '&:nth-child(9)': {
      animationDelay: 'calc(var(--shapeDelay) * 2)',
    },
  },

  ...selfBuildingSquareKeyframes,
};

export default {
  name: SPINNER_SELF_BUILDING_SQUARE,
  components: selfBuildingSquareCSS,
};
