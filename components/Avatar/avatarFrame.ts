/** How a picture sits behind the round avatar. Every value is a multiple of
 * the avatar's diameter, so one frame fits any avatar size and drawing it
 * doesn't require measuring the image. */
export interface AvatarFrame {
  width: number
  height: number
  /** Shift of the picture's center from the circle's center. */
  x: number
  y: number
}

export const AVATAR_MAX_ZOOM = 5

/** Longest plausible side: a very wide panorama at full zoom. */
const MAX_SIDE = 1000
const FRAME_SUFFIX = /#frame=([^#]*)$/

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const round = (value: number) => {
  const rounded = Math.round(value * 1000) / 1000
  return rounded === 0 ? 0 : rounded
}

const maxShift = (side: number) => Math.max(0, (side - 1) / 2)

/** The picture never leaves a gap inside the circle. */
const withinBounds = (frame: AvatarFrame): AvatarFrame => ({
  ...frame,
  x: clamp(frame.x, -maxShift(frame.width), maxShift(frame.width)),
  y: clamp(frame.y, -maxShift(frame.height), maxShift(frame.height)),
})

/** A frame for a picture of the given aspect ratio (width / height). At zoom 1
 * its short side exactly spans the circle. */
export const placeAvatarFrame = (
  aspect: number,
  zoom: number,
  x = 0,
  y = 0,
): AvatarFrame => {
  const scale = clamp(zoom, 1, AVATAR_MAX_ZOOM)
  return withinBounds({
    width: scale * Math.max(aspect, 1),
    height: scale * Math.max(1 / aspect, 1),
    x,
    y,
  })
}

export const avatarFrameZoom = (frame: AvatarFrame) =>
  Math.min(frame.width, frame.height)

const parseFrame = (text: string): AvatarFrame | null => {
  const parts = text.split(',')
  if (parts.length !== 4 || parts.some((part) => !part)) return null
  const [width, height, x, y] = parts.map(Number)
  const valid =
    [width, height, x, y].every(Number.isFinite) &&
    Math.min(width, height) >= 1 &&
    Math.max(width, height) <= MAX_SIDE
  return valid ? withinBounds({width, height, x, y}) : null
}

/** Splits a stored picture link into the real image address and its framing.
 * The framing rides in the link's fragment, which is never sent to the image
 * host. */
export const parseAvatarImage = (
  url?: string | null,
): {src: string | null; frame: AvatarFrame | null} => {
  if (!url) return {src: null, frame: null}
  const match = FRAME_SUFFIX.exec(url)
  if (!match) return {src: url, frame: null}
  return {src: url.slice(0, match.index), frame: parseFrame(match[1])}
}

/** The link to store. An untouched, centered picture stays a plain link. */
export const formatAvatarImage = (
  src: string,
  frame?: AvatarFrame | null,
): string => {
  if (!frame) return src
  const values = [frame.width, frame.height, frame.x, frame.y].map(round)
  const untouched =
    Math.min(values[0], values[1]) === 1 && !values[2] && !values[3]
  return untouched ? src : `${src}#frame=${values.join(',')}`
}

/** Absolute placement inside a circle of `size`. Centering first and moving
 * with a transform keeps it identical in RTL, where native swaps left/right. */
export const avatarFrameStyle = (frame: AvatarFrame, size: number) => {
  const width = frame.width * size
  const height = frame.height * size
  return {
    position: 'absolute' as const,
    width,
    height,
    left: (size - width) / 2,
    top: (size - height) / 2,
    transform: [{translateX: frame.x * size}, {translateY: frame.y * size}],
  }
}
