import React, {useState} from 'react'
import {View} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'
import {useShadow} from '../../shadows'

export interface SliderProps {
  value: number
  min: number
  max: number
  step?: number
  onValueChange: (value: number) => void
  accessibilityLabel: string
}

const THUMB_SIZE = 22
const TRACK_HEIGHT = 4

/** A draggable range slider — brand fill and thumb on the "off" track.
 *
 * Built on `react-native-gesture-handler`'s `Gesture.Pan`, so the app root
 * must be wrapped in `GestureHandlerRootView`. Not the classic
 * `PanResponder`: mixing it with RNGH elsewhere in a tree is a known source
 * of conflicts (on web it blocked an enclosing `ScrollView` from scrolling
 * at all). `activeOffsetX`/`failOffsetY` make the pan yield to vertical
 * scrolling. The thumb's position is a continuously computed pixel offset,
 * with no token equivalent, so this computes its own styles. */
export const Slider: React.FunctionComponent<SliderProps> = ({
  value,
  min,
  max,
  step = 1,
  onValueChange,
  accessibilityLabel,
}) => {
  const resolve = useColorResolver()
  const thumbShadow = useShadow('card')
  const [trackWidth, setTrackWidth] = useState(0)

  const clampAndStep = (raw: number) => {
    const stepped = Math.round(raw / step) * step
    // Avoid float drift from repeated 0.1/0.01-step arithmetic
    // (e.g. 1.7999999999999998).
    const decimals = step < 1 ? (String(step).split('.')[1]?.length ?? 0) : 0
    const rounded = Number(stepped.toFixed(decimals))
    return Math.min(max, Math.max(min, rounded))
  }

  const valueFromX = (x: number) => {
    if (trackWidth <= 0) return value
    const ratio = Math.min(1, Math.max(0, x / trackWidth))
    return clampAndStep(min + ratio * (max - min))
  }

  const pan = Gesture.Pan()
    .runOnJS(true)
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onBegin((e) => onValueChange(valueFromX(e.x)))
    .onUpdate((e) => onValueChange(valueFromX(e.x)))

  const ratio =
    max > min ? Math.min(1, Math.max(0, (value - min) / (max - min))) : 0
  const thumbLeft = Math.max(
    0,
    Math.min(trackWidth - THUMB_SIZE, ratio * trackWidth - THUMB_SIZE / 2),
  )
  const accent = resolve(SemanticColor.AccentPrimary)

  return (
    <GestureDetector gesture={pan}>
      <View
        onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
        accessibilityRole="adjustable"
        accessibilityLabel={accessibilityLabel}
        accessibilityValue={{min, max, now: value}}
        style={{height: THUMB_SIZE, justifyContent: 'center'}}
      >
        <View
          style={{
            height: TRACK_HEIGHT,
            borderRadius: TRACK_HEIGHT / 2,
            backgroundColor: resolve(SemanticColor.SurfaceTrackOff),
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              height: '100%',
              width: `${ratio * 100}%`,
              backgroundColor: accent,
            }}
          />
        </View>
        <View
          pointerEvents="none"
          style={[
            {
              position: 'absolute',
              left: thumbLeft,
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              borderRadius: THUMB_SIZE / 2,
              backgroundColor: accent,
            },
            thumbShadow,
          ]}
        />
      </View>
    </GestureDetector>
  )
}
