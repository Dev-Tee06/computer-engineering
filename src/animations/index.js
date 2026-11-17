// Central animation resolver
// Maps assignment.component string → actual React component

import AyodeleBouncingBall from './AyodeleBouncingBall';
import AyodeleMovingCar    from './AyodeleMovingCar';
import AyodeleMovingMoon   from './AyodeleMovingMoon';
import BabayodeCanvasAnimation from './BabayodeCanvasAnimation';
import OladipoCanvasAnimation  from './OladipoCanvasAnimation';
import AdeyinkaCanvasAnimation from './AdeyinkaCanvasAnimation';
import AdelupoCanvasAnimation  from './AdelupoCanvasAnimation';
import OlakunleMovingCar       from './OlakunleMovingCar';
import Adekunle3DCar           from './Adekunle3DCar';
import BlenderVideoPreview      from './BlenderVideoPreview';
import {
  AjagunBouncingBall,
  ArinmoBouncingBall,
  FatomilolaNightScene,
  IkotunNightScene,
} from './StudentAnimations';
import {
  TimothyBouncingBall,
  TimothyMovingCar,
  TimothyMovingMoon,
} from './TimothyAnimations';
import {
  OluropoBouncingBall,
  OluropoMovingCar,
  OluropoMovingMoon,
  RiliwanBouncingBall,
  RiliwanMovingCar,
  RiliwanOrbitingMoon,
  AdefolaseBouncingBall,
  AdefolaseCar,
  AdefolaseMoon,
} from './GenericAnimations';

const registry = {
  AyodeleBouncingBall,
  AyodeleMovingCar,
  AyodeleMovingMoon,
  BabayodeCanvasAnimation,
  OladipoCanvasAnimation,
  AdeyinkaCanvasAnimation,
  AdelupoCanvasAnimation,
  OlakunleMovingCar,
  Adekunle3DCar,
  BlenderVideoPreview,
  AjagunBouncingBall,
  ArinmoBouncingBall,
  FatomilolaNightScene,
  IkotunNightScene,
  TimothyBouncingBall,
  TimothyMovingCar,
  TimothyMovingMoon,
  OluropoBouncingBall,
  OluropoMovingCar,
  OluropoMovingMoon,
  RiliwanBouncingBall,
  RiliwanMovingCar,
  RiliwanOrbitingMoon,
  AdefolaseBouncingBall,
  AdefolaseCar,
  AdefolaseMoon,
};

/**
 * Returns the React component for a given assignment.
 * Returns null if not found.
 */
export function resolveAnimation(assignment) {
  if (!assignment) return null;
  return registry[assignment.component] ?? null;
}
