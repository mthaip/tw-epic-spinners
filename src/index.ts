import plugin from 'tailwindcss/plugin';

// Utilities
import durations from './components/utilities/durations';
import sizes from './components/utilities/sizes';

// Spinners
import flower from './components/spinners/flower';
import pixel from './components/spinners/pixel';
import hollowDots from './components/spinners/hollow-dots';
import intersectingCircles from './components/spinners/intersecting-circles';
import orbit from './components/spinners/orbit';
import radar from './components/spinners/radar';
import scalingSquares from './components/spinners/scaling-squares';
import halfCircle from './components/spinners/half-circle';
import trinityRings from './components/spinners/trinity-rings';
import fulfillingSquare from './components/spinners/fulfilling-square';
import circlesToRhombuses from './components/spinners/circles-to-rhombuses';
import semipolar from './components/spinners/semipolar';
import selfBuildingSquare from './components/spinners/self-building-square';
import swappingSquares from './components/spinners/swapping-squares';
import fulfillingBouncingCircle from './components/spinners/fulfilling-bouncing-circle';
import fingerprint from './components/spinners/fingerprint';
import spring from './components/spinners/spring';
import atom from './components/spinners/atom';
import loopingRhombuses from './components/spinners/looping-rhombuses';
import breedingRhombus from './components/spinners/breeding-rhombus';

// Utils
import { buildTailwindComponent, normalizeClasses } from './utils/builder';

const utilities = [sizes, durations];

const spinners = {
  'spinner-flower': flower,
  'spinner-pixel': pixel,
  'spinner-hollow-dots': hollowDots,
  'spinner-intersecting-circles': intersectingCircles,
  'spinner-orbit': orbit,
  'spinner-radar': radar,
  'spinner-scaling-squares': scalingSquares,
  'spinner-half-circle': halfCircle,
  'spinner-trinity-rings': trinityRings,
  'spinner-fulfilling-square': fulfillingSquare,
  'spinner-circles-to-rhombuses': circlesToRhombuses,
  'spinner-semipolar': semipolar,
  'spinner-self-building-square': selfBuildingSquare,
  'spinner-swapping-squares': swappingSquares,
  'spinner-fulfilling-bouncing-circle': fulfillingBouncingCircle,
  'spinner-fingerprint': fingerprint,
  'spinner-spring': spring,
  'spinner-atom': atom,
  'spinner-looping-rhombuses': loopingRhombuses,
  'spinner-breeding-rhombus': breedingRhombus,
} as const;

export type Spinner = keyof typeof spinners;

export function creator(spinner: Spinner, classes?: string | string[]) {
  return spinners[spinner].creator(normalizeClasses(classes));
}

export default plugin(({ matchUtilities, addComponents, theme }) => {
  // Registers custom utilities
  utilities.forEach(({ utility, buildComponents, themeKey }) => {
    // Registers dynamic utility spinner-size-* & spinner-duration-*
    matchUtilities(utility);

    // Registers theses utilities with tailwind default spacings
    addComponents(buildComponents(theme(themeKey)));
  });

  // Registers spinners
  Object.values(spinners).forEach(({ name, components, keyframes }) => {
    // Registers spinner as components
    addComponents(buildTailwindComponent(name, components));

    // ! Temporary disable type check since tailwwind v4 does not export CssInJs type
    // Registers keyframes as separate component
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    addComponents(keyframes);
  });
});
