// Shared CSS variables and animation naming. Component-specific geometry stays local.
export const SPINNER_ITEM = 'spinner-item';

export const size = 'var(--spinner-size)';
export const duration = 'var(--spinner-duration, 0s)';
export const count = 'var(--spinner-count)';
export const index = 'var(--spinner-index)';

export const buildSpinnerAnimationName = (...names: string[]) =>
  ['animation', ...names].map((name) => name.trim()).join('-');
