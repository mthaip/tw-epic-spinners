const spinners = [
  { name: 'flower', count: 8 },
  { name: 'pixel', count: 8 },
  { name: 'hollow-dots', count: 3 },
  { name: 'intersecting-circles', count: 7 },
  { name: 'orbit', count: 3 },
  { name: 'radar', count: 4 },
  { name: 'scaling-squares', count: 4 },
  { name: 'half-circle', count: 2 },
  { name: 'trinity-rings', count: 3 },
  { name: 'fulfilling-square', count: 1 },
  { name: 'circles-to-rhombuses', count: 3 },
  { name: 'semipolar', count: 5 },
  { name: 'self-building-square', count: 9 },
  { name: 'swapping-squares', count: 4 },
  { name: 'fulfilling-bouncing-circle', count: 2 },
  { name: 'fingerprint', count: 9 },
  { name: 'spring', count: 2 },
  { name: 'atom', count: 3 },
  { name: 'looping-rhombuses', count: 3 },
  { name: 'breeding-rhombus', count: 8 },
] as const;

export type SpinnerName = (typeof spinners)[number]['name'];
export type SpinnerDefinition = (typeof spinners)[number];
export default spinners;
