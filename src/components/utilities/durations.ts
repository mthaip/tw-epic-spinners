const SPINNER_DURATION = 'spinner-duration';

export const SPINNER_DURATION_DEFAULT = '1.5s';
export const SPINNER_DURATION_VAR = '--spinnerDuration';

const getDurationClass = (duration: string) => {
  return {
    '&[class^="spinner"]': {
      [SPINNER_DURATION_VAR]: duration,
    },
  };
};

const buildComponents = (configDurations: Record<string, string>) => {
  return Object.entries(configDurations).reduce((result, [key, value]) => {
    return {
      ...result,
      ...{
        [`.${SPINNER_DURATION}${key === 'DEFAULT' ? '' : `-${key}`}`]:
          getDurationClass(value),
      },
    };
  }, {});
};

export default {
  utility: {
    // TODO: type
    [SPINNER_DURATION]: (value: string) => {
      return getDurationClass(value);
    },
  },
  buildComponents,
  themeKey: 'transitionDuration',
};
