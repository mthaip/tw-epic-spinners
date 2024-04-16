const SPINNER_SIZE = 'spinner-size';

export const SPINNER_SIZE_DEFAULT = '4.5rem';
export const SPINNER_SIZE_VAR = '--spinnerSize';

const getSizeClass = (size: string) => {
  return {
    '&[class^="spinner"]': {
      [SPINNER_SIZE_VAR]: size,
    },
  };
};

const buildComponents = (configSpacings: Record<string, string>) => {
  return Object.entries(configSpacings).reduce((result, [key, value]) => {
    return {
      ...result,
      [`.${SPINNER_SIZE}-${key}`]: getSizeClass(value),
    };
  }, {});
};

export default {
  utility: {
    // TODO: type
    [SPINNER_SIZE]: (value: string) => {
      return getSizeClass(value);
    },
  },
  buildComponents,
  themeKey: 'spacing',
};
