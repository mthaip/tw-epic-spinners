import {
  SPINNER_SIZE_DEFAULT,
  SPINNER_SIZE_VAR,
} from '../components/utilities/sizes';
import {
  SPINNER_DURATION_VAR,
  SPINNER_DURATION_DEFAULT,
} from '../components/utilities/durations';

export const buildTailwindComponent = (
  className: string,
  otherCSSRules: Record<string, unknown>,
) => {
  return {
    [`.${className}`]: {
      // CSS vars
      [SPINNER_SIZE_VAR]: SPINNER_SIZE_DEFAULT,
      [SPINNER_DURATION_VAR]: SPINNER_DURATION_DEFAULT,
      // Reset box model
      boxSizing: 'border-box',
      '& *': {
        boxSizing: 'border-box',
      },
      ...otherCSSRules,
    },
  };
};

export const buildSpinnerAnimationName = (...names: string[]) => {
  return ['animation', ...names].map((name) => name.trim()).join('-');
};

export const normalizeClasses = (stringInput: unknown): string => {
  if (typeof stringInput === 'string') {
    return stringInput;
  }

  if (
    Array.isArray(stringInput) &&
    stringInput.every((item) => typeof item === 'string')
  ) {
    return stringInput.join(' ');
  }

  return '';
};
