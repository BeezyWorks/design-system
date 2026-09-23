import React, {useEffect} from 'react'
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {Navigation} from 'lucide-react-native'
import {White} from '../../colors'

export interface MizrachCompassProps {
  /** Degrees to rotate the needle toward the mizrach/Jerusalem bearing. */
  rotation: number
  onPress: () => void
}

// Lucide's `navigation` glyph points northeast (its tip sits at the box's
// top-right corner) rather than up, unlike the Material icon this replaced —
// rotate it back by this much so `rotation={0}` still means "pointing up".
const ICON_BASELINE_OFFSET_DEG = -45

// The shortest signed angular distance from `from` to `to`, so an update
// that crosses the 0/360 seam (e.g. 359deg -> 1deg) animates as a small
// step in one direction instead of spinning nearly a full turn the other way.
const shortestDelta = (from: number, to: number) => {
  const diff = (to - from) % 360
  if (diff > 180) return diff - 360
  if (diff < -180) return diff + 360
  return diff
}

/** The mizrach/Jerusalem-direction compass needle. Unlike the rest of
 * `@design`, it genuinely needs a raw numeric `transform` — it spins
 * continuously as the device heading changes, which the `Stack` token API
 * has no declarative prop for — so that one style value lives here rather
 * than in a token. */
export const MizrachCompass: React.FunctionComponent<MizrachCompassProps> = ({
  rotation,
  onPress,
}) => {
  // Accumulates unbounded past +-360 (rather than resetting to the raw
  // mod-360 `rotation` each time) so the needle keeps turning the way it
  // started instead of unwinding — the diff below is always taken against
  // this shared value's own current position, never a separately-tracked
  // "last target", so there's only ever one number that can be stale.
  const animatedRotation = useSharedValue(rotation)

  useEffect(() => {
    const delta = shortestDelta(animatedRotation.value, rotation)
    animatedRotation.value = withTiming(animatedRotation.value + delta, {
      duration: 200,
      // Linear, not the default ease-in-out — a fresh tween re-triggers on
      // every heading tick while turning, and ease-in-out's deceleration
      // compounding across back-to-back tweens is what made the needle
      // look drunk instead of just smooth.
      easing: Easing.linear,
    })
  }, [rotation])

  const style = useAnimatedStyle(() => ({
    transform: [
      {rotate: `${animatedRotation.value + ICON_BASELINE_OFFSET_DEG}deg`},
    ],
  }))

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={style}>
        <Navigation size={30} color={White} fill={White} />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}
