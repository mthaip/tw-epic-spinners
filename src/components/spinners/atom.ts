import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { CSSRuleObject } from 'tailwindcss/types/config';

const SPINNER_ATOM = 'spinner-atom';

const ATOM_ANIMATION = {
  FIRST: 'atom-animation-1',
  SECOND: 'atom-animation-2',
  THIRD: 'atom-animation-3',
};

const atomKeyframes: CSSRuleObject | CSSRuleObject[] = {
  [`@keyframes ${ATOM_ANIMATION.FIRST}`]: {
    '100%': { transform: 'rotateZ(120deg) rotateX(66deg) rotateZ(360deg)' },
  },
  [`@keyframes ${ATOM_ANIMATION.SECOND}`]: {
    '100%': { transform: 'rotateZ(240deg) rotateX(66deg) rotateZ(360deg)' },
  },
  [`@keyframes ${ATOM_ANIMATION.THIRD}`]: {
    '100%': { transform: 'rotateZ(360deg) rotateX(66deg) rotateZ(360deg)' },
  },
};

const atomCSS = {
  height: `var(${SPINNER_SIZE_VAR})`,
  width: `var(${SPINNER_SIZE_VAR})`,
  overflow: 'hidden',

  '& > div': {
    position: 'relative',
    display: 'block',
    height: '100%',
    width: '100%',

    '&::after': {
      content: "'\\2022'",
      display: 'block',
      position: 'absolute',
      color: 'currentColor',
      fontSize: `calc(var(${SPINNER_SIZE_VAR}) * 0.5)`,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },

    '& > div': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animationDuration: `var(${SPINNER_DURATION_VAR})`,
      borderLeftWidth: `calc(var(${SPINNER_SIZE_VAR}) / 25)`,
      borderTopWidth: `calc(var(${SPINNER_SIZE_VAR}) / 25)`,
      borderLeftColor: 'currentColor',
      borderLeftStyle: 'solid',
      borderTopStyle: 'solid',
      borderTopColor: 'transparent',

      '&:nth-child(1)': {
        animation: `${ATOM_ANIMATION.FIRST} var(${SPINNER_DURATION_VAR}) linear infinite`,
        transform: 'rotateZ(120deg) rotateX(66deg) rotateZ(0deg)',
      },

      '&:nth-child(2)': {
        animation: `${ATOM_ANIMATION.SECOND} var(${SPINNER_DURATION_VAR}) linear infinite`,
        transform: 'rotateZ(240deg) rotateX(66deg) rotateZ(0deg)',
      },

      '&:nth-child(3)': {
        animation: `${ATOM_ANIMATION.THIRD} var(${SPINNER_DURATION_VAR}) linear infinite`,
        transform: 'rotateZ(360deg) rotateX(66deg) rotateZ(0deg)',
      },
    },
  },

  ...atomKeyframes,
};

export default { name: SPINNER_ATOM, components: atomCSS };
