import tailwindPlugin from 'tailwindcss/plugin';
import dimensions from './components/utilities/dimensions';
import flower from './components/spinners/flower';
import pixel from './components/spinners/pixel';
import hollowDots from './components/spinners/hollow-dots';
import circlesToRhombuses from './components/spinners/circles-to-rhombuses';
import fingerprint from './components/spinners/fingerprint';
import semipolar from './components/spinners/semipolar';
import radar from './components/spinners/radar';
import intersectingCircles from './components/spinners/intersecting-circles';
import orbit from './components/spinners/orbit';
import trinityRings from './components/spinners/trinity-rings';
import atom from './components/spinners/atom';
import scalingSquares from './components/spinners/scaling-squares';
import swappingSquares from './components/spinners/swapping-squares';
import breedingRhombus from './components/spinners/breeding-rhombus';
import selfBuildingSquare from './components/spinners/self-building-square';
import fulfillingSquare from './components/spinners/fulfilling-square';
import halfCircle from './components/spinners/half-circle';
import fulfillingBouncingCircle from './components/spinners/fulfilling-bouncing-circle';
import spring from './components/spinners/spring';
import loopingRhombuses from './components/spinners/looping-rhombuses';

export type Spinner =
  | 'spinner-flower'
  | 'spinner-pixel'
  | 'spinner-hollow-dots'
  | 'spinner-intersecting-circles'
  | 'spinner-orbit'
  | 'spinner-radar'
  | 'spinner-scaling-squares'
  | 'spinner-half-circle'
  | 'spinner-trinity-rings'
  | 'spinner-fulfilling-square'
  | 'spinner-circles-to-rhombuses'
  | 'spinner-semipolar'
  | 'spinner-self-building-square'
  | 'spinner-swapping-squares'
  | 'spinner-fulfilling-bouncing-circle'
  | 'spinner-fingerprint'
  | 'spinner-spring'
  | 'spinner-atom'
  | 'spinner-looping-rhombuses'
  | 'spinner-breeding-rhombus';

const spinners = [
  flower,
  pixel,
  hollowDots,
  circlesToRhombuses,
  fingerprint,
  semipolar,
  radar,
  intersectingCircles,
  orbit,
  trinityRings,
  atom,
  scalingSquares,
  swappingSquares,
  breedingRhombus,
  selfBuildingSquare,
  fulfillingSquare,
  halfCircle,
  fulfillingBouncingCircle,
  spring,
  loopingRhombuses,
];

export default tailwindPlugin((api) => {
  dimensions.handler(api);

  for (const spinner of spinners) {
    api.addComponents(spinner.components);
    api.addBase(spinner.keyframes);
  }
});
