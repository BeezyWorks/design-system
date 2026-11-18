import React from 'react'
import {Image, View} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'
import {radius} from '../../radius'
import {Slider} from '../Slider'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Avatar} from './Avatar'
import {
  AVATAR_MAX_ZOOM,
  AvatarFrame,
  avatarFrameStyle,
  avatarFrameZoom,
  placeAvatarFrame,
} from './avatarFrame'

export interface AvatarFrameEditorProps {
  /** The image address, without any framing. Give the editor this as its
   * `key` too, so a different picture starts fresh. */
  imageUrl: string
  /** Where the picture starts. Default: centered, filling the circle. */
  initialFrame?: AvatarFrame | null
  /** Called with every change, and with the starting frame. */
  onChange: (frame: AvatarFrame | null) => void
  /** Shown under the picture, and read out for it. */
  hint: string
  zoomLabel: string
  /** For the initials shown when the picture can't load. */
  name?: string | null
  email?: string | null
  /** Diameter of the circle. Default 168. */
  size?: number
}

/** Room around the circle where the rest of the picture shows, dimmed. */
const MARGIN = 16

/** Drag to position a picture in the avatar circle; pinch or slide to zoom.
 * Needs `GestureHandlerRootView` at the app root, like `Slider`. */
export const AvatarFrameEditor: React.FunctionComponent<
  AvatarFrameEditorProps
> = ({
  imageUrl,
  initialFrame,
  onChange,
  hint,
  zoomLabel,
  name,
  email,
  size = 168,
}) => {
  const resolve = useColorResolver()
  const [aspect, setAspect] = React.useState<number | null>(null)
  const [failed, setFailed] = React.useState(false)
  const [frame, setFrame] = React.useState<AvatarFrame | null>(
    initialFrame ?? null,
  )
  // Gesture callbacks can fire several times between renders.
  const latest = React.useRef(frame)
  const pinchStart = React.useRef(1)
  const onChangeRef = React.useRef(onChange)
  onChangeRef.current = onChange
  const initial = React.useRef(initialFrame)

  React.useEffect(() => {
    let current = true
    onChangeRef.current(initial.current ?? null)
    Image.getSize(
      imageUrl,
      (width, height) => {
        if (!current) return
        if (!width || !height) return setFailed(true)
        const ratio = width / height
        const start = initial.current
        const placed = placeAvatarFrame(
          ratio,
          start ? avatarFrameZoom(start) : 1,
          start?.x,
          start?.y,
        )
        latest.current = placed
        setFrame(placed)
        setAspect(ratio)
        onChangeRef.current(placed)
      },
      () => {
        if (current) setFailed(true)
      },
    )
    return () => {
      current = false
    }
  }, [imageUrl])

  if (failed)
    return (
      <Stack align="center">
        <Avatar name={name} email={email} size={72} />
      </Stack>
    )

  const place = (zoom: number, x: number, y: number) => {
    if (aspect === null) return
    const next = placeAvatarFrame(aspect, zoom, x, y)
    latest.current = next
    setFrame(next)
    onChangeRef.current(next)
  }

  /** Zooms around the circle's center, keeping the same spot under it. */
  const zoomTo = (zoom: number) => {
    const current = latest.current
    if (!current) return
    const ratio =
      Math.min(AVATAR_MAX_ZOOM, Math.max(1, zoom)) / avatarFrameZoom(current)
    place(zoom, current.x * ratio, current.y * ratio)
  }

  const pan = Gesture.Pan()
    .runOnJS(true)
    // Follows the finger from the first pixel, with no dead zone to lose.
    .minDistance(0)
    .onChange((event) => {
      const current = latest.current
      if (!current) return
      place(
        avatarFrameZoom(current),
        current.x + event.changeX / size,
        current.y + event.changeY / size,
      )
    })
  const pinch = Gesture.Pinch()
    .runOnJS(true)
    .onStart(() => {
      pinchStart.current = latest.current ? avatarFrameZoom(latest.current) : 1
    })
    .onUpdate((event) => zoomTo(pinchStart.current * event.scale))

  const stage = size + MARGIN * 2
  const circle = {
    position: 'absolute' as const,
    left: MARGIN,
    top: MARGIN,
    width: size,
    height: size,
  }
  const picture =
    frame && aspect !== null ? (
      <Image
        source={{uri: imageUrl}}
        style={avatarFrameStyle(frame, size)}
        accessibilityIgnoresInvertColors
      />
    ) : null

  return (
    <Stack align="center" gap="sm">
      <GestureDetector gesture={Gesture.Simultaneous(pan, pinch)}>
        <View
          accessible
          accessibilityRole="image"
          accessibilityLabel={hint}
          testID="avatar-frame-stage"
          style={{
            width: stage,
            height: stage,
            overflow: 'hidden',
            borderRadius: radius.md,
            backgroundColor: resolve(SemanticColor.SurfaceTrackOff),
          }}
        >
          <View pointerEvents="none" style={[circle, {opacity: 0.3}]}>
            {picture}
          </View>
          <View
            pointerEvents="none"
            style={[
              circle,
              {
                overflow: 'hidden',
                borderRadius: size / 2,
                backgroundColor: resolve(SemanticColor.AccentTint),
              },
            ]}
          >
            {picture}
          </View>
        </View>
      </GestureDetector>
      <Stack width={stage} gap="sm">
        <Slider
          value={frame ? avatarFrameZoom(frame) : 1}
          min={1}
          max={AVATAR_MAX_ZOOM}
          step={0.01}
          onValueChange={zoomTo}
          accessibilityLabel={zoomLabel}
        />
        <Text
          variant="caption"
          color={SemanticColor.TextSecondary}
          align="center"
        >
          {hint}
        </Text>
      </Stack>
    </Stack>
  )
}
