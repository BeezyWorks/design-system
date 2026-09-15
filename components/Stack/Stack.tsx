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
  gap?: SpacingToken
  padding?: SpacingToken
  paddingHorizontal?: SpacingToken
  paddingVertical?: SpacingToken
  paddingTop?: SpacingToken
  paddingBottom?: SpacingToken
  paddingStart?: SpacingToken
  paddingEnd?: SpacingToken
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
  borderBottomWidth?: 'hairline' | 'none'
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
    position === 'absoluteFill' ? StyleSheet.absoluteFill : null,
    {
      flexDirection: directionMap[direction],
      alignItems: align ? alignMap[align] : undefined,
      justifyContent: justify ? justifyMap[justify] : undefined,
      flexWrap: wrap ? 'wrap' : undefined,
      gap: gap ? spacing[gap] : undefined,
      padding: padding ? spacing[padding] : undefined,
      paddingHorizontal: paddingHorizontal
        ? spacing[paddingHorizontal]
        : undefined,
      paddingVertical: paddingVertical ? spacing[paddingVertical] : undefined,
      paddingTop: paddingTop ? spacing[paddingTop] : undefined,
      paddingBottom: paddingBottom ? spacing[paddingBottom] : undefined,
      paddingStart: paddingStart ? spacing[paddingStart] : undefined,
      paddingEnd: paddingEnd ? spacing[paddingEnd] : undefined,
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
      borderBottomWidth:
        borderBottomWidth === 'hairline' ? StyleSheet.hairlineWidth : undefined,
      borderColor: borderColor ? colors[borderColor] : undefined,
    } as FlexStyle,
    shadow ? shadows[shadow] : null,
  ]

  return (
    <View style={style} {...viewProps}>
      {children}
    </View>
  )
}
