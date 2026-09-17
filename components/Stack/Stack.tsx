import React from 'react'
import {
  View,
  ViewProps,
  StyleSheet,
  FlexAlignType,
  FlexStyle,
} from 'react-native'
import {spacing, SpacingToken} from '../../spacing'
import {radius, RadiusToken} from '../../radius'
import {shadows, ShadowToken} from '../../shadows'
import {useColors, Colors, withOpacity} from '../../colors'

export type Direction = 'row' | 'rowReverse' | 'column' | 'columnReverse'
export type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type Justify =
  'start' | 'center' | 'end' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly'
export type Background = keyof Colors
/** A rhythm-scale token, or a literal pixel value for the rare case a
 * design spec calls for something the scale doesn't have. */
export type Spacing = SpacingToken | number

const resolveSpacing = (value: Spacing | undefined): number | undefined =>
  typeof value === 'number' ? value : value ? spacing[value] : undefined

const directionMap: Record<Direction, FlexStyle['flexDirection']> = {
  row: 'row',
  rowReverse: 'row-reverse',
  column: 'column',
  columnReverse: 'column-reverse',
}
const alignMap: Record<Align, FlexAlignType> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
}
const justifyMap: Record<Justify, FlexStyle['justifyContent']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  spaceBetween: 'space-between',
  spaceAround: 'space-around',
  spaceEvenly: 'space-evenly',
}

export interface StackProps extends Pick<
  ViewProps,
  | 'onLayout'
  | 'pointerEvents'
  | 'testID'
  | 'accessibilityRole'
  | 'accessibilityLabel'
  | 'accessible'
> {
  children?: React.ReactNode
  /** Default `column`. */
  direction?: Direction
  align?: Align
  justify?: Justify
  wrap?: boolean
  /** Gap between children along the main and cross axis. */
  gap?: Spacing
  padding?: Spacing
  paddingHorizontal?: Spacing
  paddingVertical?: Spacing
  paddingTop?: Spacing
  paddingBottom?: Spacing
  paddingStart?: Spacing
  paddingEnd?: Spacing
  /** Grow to fill available main-axis space, like `flex: 1`. */
  grow?: boolean
  /** Exact flex-basis dimensions — a declarative scalar, not a style object. */
  width?: number | `${number}%`
  height?: number | `${number}%`
  /** Stretch to fill the parent in both axes. */
  fill?: boolean
  background?: Background
  /** 0–1, applied on top of `background`. */
  backgroundOpacity?: number
  radius?: RadiusToken
  shadow?: ShadowToken
  overflow?: 'visible' | 'hidden'
  position?: 'relative' | 'absolute' | 'absoluteFill'
  top?: SpacingToken
  bottom?: SpacingToken
  left?: SpacingToken
  right?: SpacingToken
  opacity?: number
  zIndex?: number
  /** A full border on every side, in logical pixels — pair with
   * `borderColor`. Use `borderBottomWidth` instead for a divider-only
   * bottom edge. */
  borderWidth?: number
  borderBottomWidth?: 'hairline' | 'none' | number
  borderColor?: Background
}

/** The app's one generic layout primitive — every screen composes with this
 * instead of `View` + `StyleSheet.create`. Every value is a token or a plain
 * scalar; there is no `style` prop. */
export const Stack: React.FunctionComponent<StackProps> = ({
  children,
  direction = 'column',
  align,
  justify,
  wrap,
  gap,
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingBottom,
  paddingStart,
  paddingEnd,
  grow,
  width,
  height,
  fill,
  background,
  backgroundOpacity,
  radius: radiusToken,
  shadow,
  overflow,
  position = 'relative',
  top,
  bottom,
  left,
  right,
  opacity,
  zIndex,
  borderWidth,
  borderBottomWidth,
  borderColor,
  ...viewProps
}) => {
  const colors = useColors()

  const backgroundColor = background
    ? backgroundOpacity !== undefined
      ? withOpacity(colors[background], backgroundOpacity)
      : colors[background]
    : undefined

  const style = [
    {
      flexDirection: directionMap[direction],
      alignItems: align ? alignMap[align] : undefined,
      justifyContent: justify ? justifyMap[justify] : undefined,
      flexWrap: wrap ? 'wrap' : undefined,
      gap: resolveSpacing(gap),
      padding: resolveSpacing(padding),
      paddingHorizontal: resolveSpacing(paddingHorizontal),
      paddingVertical: resolveSpacing(paddingVertical),
      paddingTop: resolveSpacing(paddingTop),
      paddingBottom: resolveSpacing(paddingBottom),
      paddingStart: resolveSpacing(paddingStart),
      paddingEnd: resolveSpacing(paddingEnd),
      flexGrow: grow ? 1 : undefined,
      width: fill ? '100%' : width,
      height: fill ? '100%' : height,
      backgroundColor,
      borderRadius: radiusToken ? radius[radiusToken] : undefined,
      overflow,
      position: position === 'absolute' ? 'absolute' : undefined,
      top: top ? spacing[top] : undefined,
      bottom: bottom ? spacing[bottom] : undefined,
      left: left ? spacing[left] : undefined,
      right: right ? spacing[right] : undefined,
      opacity,
      zIndex,
      borderWidth,
      borderBottomWidth:
        typeof borderBottomWidth === 'number'
          ? borderBottomWidth
          : borderBottomWidth === 'hairline'
            ? StyleSheet.hairlineWidth
            : undefined,
      borderColor: borderColor ? colors[borderColor] : undefined,
    } as FlexStyle,
    // Must come *after* the object above, not before: RN's style-array
    // flattening does a plain per-key merge across entries in order, and
    // that object above always includes `position`/`top`/`left`/`right`/
    // `bottom` keys (as `undefined` when not driven by a prop) — an
    // earlier `StyleSheet.absoluteFill` here would have its real values
    // overwritten back to `undefined` by those, silently breaking every
    // `position="absoluteFill"` fill (scrims, loaders) into a non-fill.
    position === 'absoluteFill' ? StyleSheet.absoluteFill : null,
    shadow ? shadows[shadow] : null,
  ]

  return (
    <View style={style} {...viewProps}>
      {children}
    </View>
  )
}
