import tailwindPlugin from 'tailwindcss/plugin';

// Tailwind accepts canonical non-negative numbers: whole milliseconds or
// quarter-step spacing multipliers. Reject aliases such as "01" and "3.50".
const isValidNumber = (value: string, step = 1) => {
  const number = Number(value);
  return number >= 0 && number % step === 0 && String(number) === value;
};

export default tailwindPlugin(({ matchUtilities, theme }) => {
  const spacing = theme('spacing', {});
  const durations = theme('transitionDuration', {});
  // V3 uses configured scales unchanged. V4 needs live CSS theme references
  // instead of the fixed defaults returned by its legacy theme API.
  const isV4 =
    theme('--spacing') !== undefined ||
    typeof durations.__BARE_VALUE__ === 'function';

  const themeValues = (scale: object, namespace: string) =>
    Object.fromEntries(
      Object.keys(scale)
        .filter(
          (key) =>
            key !== 'DEFAULT' && theme(`--${namespace}-${key}`) !== undefined,
        )
        .map((key) => [key, `--theme(--${namespace}-${key})`]),
    );

  const sizeValues = isV4
    ? {
        auto: 'auto',
        full: '100%',
        min: 'min-content',
        max: 'max-content',
        fit: 'fit-content',
        px: '1px',
        dvw: '100dvw',
        dvh: '100dvh',
        lvw: '100lvw',
        lvh: '100lvh',
        svw: '100svw',
        svh: '100svh',
        ...themeValues(spacing, 'spacing'),
        __BARE_VALUE__: ({
          value,
          fraction,
        }: {
          value: string;
          fraction: string | null;
        }) => {
          if (fraction) {
            const [numerator, denominator] = fraction.split('/');
            if (isValidNumber(numerator) && isValidNumber(denominator)) {
              return `calc(${numerator} / ${denominator} * 100%)`;
            }
            return;
          }
          if (theme('--spacing') !== undefined && isValidNumber(value, 0.25))
            return `--spacing(${value})`;
        },
      }
    : spacing;

  matchUtilities(
    { 'spinner-size': (value) => ({ '--spinner-size': value }) },
    { values: sizeValues },
  );
  matchUtilities(
    { 'spinner-duration': (value) => ({ '--spinner-duration': value }) },
    {
      values: isV4
        ? {
            initial: 'initial',
            ...themeValues(durations, 'transition-duration'),
            __BARE_VALUE__: ({ value }: { value: string }) => {
              if (!isValidNumber(value)) return;
              return `${value}ms`;
            },
          }
        : durations,
    },
  );
});
