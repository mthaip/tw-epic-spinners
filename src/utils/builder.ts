import { CSSRuleObject } from 'tailwindcss/types/config';
import {
  SPINNER_SIZE_DEFAULT,
  SPINNER_SIZE_VAR,
} from '../components/utilities/sizes';
import {
  SPINNER_DURATION_VAR,
  SPINNER_DURATION_DEFAULT,
} from '../components/utilities/durations';

type CSSRules = CSSRuleObject | CSSRuleObject[];

export const buildTailwindComponent = (
  className: string,
  otherCSSRules: CSSRules,
): CSSRules => {
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
  } as CSSRules;
};
