import React, {useRef, useState} from 'react'
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import {SemanticColor} from '../../colors'
import {spacing, SpacingToken} from '../../spacing'
import {useColorResolver} from '../../theme'
import {useRtl} from '../../layout'
import {Stack} from '../Stack'

export interface ChipScrollerProps {
  /** The chips, in reading order. */
  children?: React.ReactNode
  /** Space between chips. Default `xs`. */
  gap?: SpacingToken
  /** Padding at the strip's ends. Default `md`. */
  padding?: SpacingToken
  /** Lay out right to left and open at the right edge, where the first chip
   * is. Defaults to the nearest `RtlScope`. */
  rtl?: boolean
  /** What the edge fade melts into — the surface behind the strip. Default
   * `SurfaceBackground`. */
  fadeColor?: SemanticColor
}

const FADE_WIDTH = spacing.xl
const EDGE_SLOP = 2

// A color with its own alpha at zero, so the gradient doesn't pass through
// gray on iOS.
const clear = (color: string) =>
  /^#[0-9a-f]{6}$/i.test(color) ? `${color}00` : 'transparent'

/** A horizontally scrolling row of `Chip`s for filters: no scrollbar, and
 * a fade on whichever edge has more chips beyond it. */
export const ChipScroller: React.FunctionComponent<ChipScrollerProps> = ({
  children,
  gap = 'xs',
  padding = 'md',
  rtl: rtlProp,
  fadeColor = SemanticColor.SurfaceBackground,
}) => {
  const rtl = useRtl(rtlProp)
  const resolve = useColorResolver()
  const scroller = useRef<ScrollView>(null)
  const [width, setWidth] = useState(0)
  const [content, setContent] = useState(0)
  const [offset, setOffset] = useState(0)
  const startedAtEnd = useRef(false)

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) =>
    setOffset(e.nativeEvent.contentOffset.x)
  const onLayout = (e: LayoutChangeEvent) =>
    setWidth(e.nativeEvent.layout.width)
  const onContentSizeChange = (w: number) => {
    setContent(w)
    if (rtl && !startedAtEnd.current && w > 0) {
      startedAtEnd.current = true
      scroller.current?.scrollToEnd({animated: false})
    }
  }

  // Physical edges: the offset is measured from the left whatever the
  // reading direction.
  const fadeLeft = offset > EDGE_SLOP
  const fadeRight = content > width && offset + width < content - EDGE_SLOP

  const solid = resolve(fadeColor)
  const colors = [solid, clear(solid)] as const

  return (
    <View onLayout={onLayout}>
      <ScrollView
        ref={scroller}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        onContentSizeChange={onContentSizeChange}
      >
        <Stack
          direction={rtl ? 'rowReverse' : 'row'}
          gap={gap}
          paddingHorizontal={padding}
          paddingVertical="xs"
          align="center"
        >
          {children}
        </Stack>
      </ScrollView>
      {fadeLeft ? (
        <LinearGradient
          pointerEvents="none"
          colors={colors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[styles.fade, styles.left]}
        />
      ) : null}
      {fadeRight ? (
        <LinearGradient
          pointerEvents="none"
          colors={colors}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0}}
          style={[styles.fade, styles.right]}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  fade: {position: 'absolute', top: 0, bottom: 0, width: FADE_WIDTH},
  left: {left: 0},
  right: {right: 0},
})
