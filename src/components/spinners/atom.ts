import { SPINNER_SIZE_VAR } from '../utilities/sizes';
import { SPINNER_DURATION_VAR } from '../utilities/durations';
import { buildSpinnerAnimationName } from '../../utils/builder';

const SPINNER_ATOM = 'spinner-atom';

const ATOM_ANIMATION = {
  FIRST: buildSpinnerAnimationName(SPINNER_ATOM, 'first'),
  SECOND: buildSpinnerAnimationName(SPINNER_ATOM, 'second'),
  THIRD: buildSpinnerAnimationName(SPINNER_ATOM, 'third'),
} as const;

const atomKeyframes = {
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

const CONTENT = `
  <div>
    <div></div>
    <div></div>
    <div></div>
  </div>
`.trim();

const atomCSS = {
  height: `var(${SPINNER_SIZE_VAR})`,
  width: `var(${SPINNER_SIZE_VAR})`,
  overflow: 'hidden',

  // content: `'${encodeURIComponent(CONTENT)}'`,

  // '&::before': {
  //   content: `'${encodeURIComponent(CONTENT)}'`,
  // },

  'background-color': 'currentColor',
  mask: 'no-repeat center / 100%',
  'mask-image': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M11 8c0 2.21-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4m0 6.72V20H0v-2c0-2.21 3.13-4 7-4c1.5 0 2.87.27 4 .72M24 20H13V3h11v17m-8-8.5a2.5 2.5 0 0 1 5 0a2.5 2.5 0 0 1-5 0M22 7a2 2 0 0 1-2-2h-3c0 1.11-.89 2-2 2v9a2 2 0 0 1 2 2h3c0-1.1.9-2 2-2V7Z'/%3E%3C/svg%3E")`,

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
};

const creator = (classes: string = ''): string => {
  return `
    <div class="${SPINNER_ATOM} ${classes}">
    </div>
  `.trim();
};

export default {
  name: SPINNER_ATOM,
  components: atomCSS,
  keyframes: atomKeyframes,
  creator,
};
