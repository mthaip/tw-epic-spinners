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
import { buildTailwindComponent } from './utils/builder';

const utilities = [sizes, durations];
const spinners = [
  flower,
  pixel,
  hollowDots,
  intersectingCircles,
  orbit,
  radar,
  scalingSquares,
  halfCircle,
  trinityRings,
  fulfillingSquare,
  circlesToRhombuses,
  semipolar,
  selfBuildingSquare,
  swappingSquares,
  fulfillingBouncingCircle,
  fingerprint,
  spring,
  atom,
  loopingRhombuses,
  breedingRhombus,
];

export default plugin(({ matchUtilities, addComponents, theme }) => {
  utilities.forEach(({ utility, buildComponents, themeKey }) => {
    matchUtilities(utility);
    addComponents(buildComponents(theme(themeKey)));
  });

  spinners.forEach(({ name, components }) => {
    addComponents(buildTailwindComponent(name, components));
  });
});
