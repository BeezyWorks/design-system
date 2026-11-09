import React, {useEffect, useRef} from 'react'
import {Animated, Pressable, StyleSheet, View} from 'react-native'
import {SemanticColor} from '../../colors'
import {radius} from '../../radius'
import {spacing} from '../../spacing'
import {useColorResolver} from '../../theme'
import {useReducedMotion, useRtl} from '../../layout'

export interface PageDotsProps {
  count: number
  /** The current page, 0-based. */
  index: number
  /** Makes each dot a tap target that jumps to its page. */
  onSelect?: (index: number) => void
  /** Each page's name, for screen readers. */
  labels?: string[]
  /** A pager is being dragged: the active pill flattens a little. */
  dragging?: boolean
}

const DOT = 6
const DOT_FLAT = 4
const ACTIVE_WIDTH = 18
// A 6pt dot is too small to hit; each sits in a 20pt-tall, padded target.
const TARGET_HEIGHT = 20
const SLOT = DOT + spacing.xs * 2
const INACTIVE_OPACITY = 0.5

// The edge that leads springs first and tight; the trailing edge follows
// after a beat, softer — so the pill stretches, then snaps together.
const LEAD = {stiffness: 330, damping: 15, mass: 1}
const TRAIL = {stiffness: 230, damping: 17, mass: 1}
const TRAIL_DELAY = 100

/** A pager's position: one dot per page and an accent "worm" over the
 * current one. When the page changes the pill's leading edge springs to
 * the new dot, then its trailing edge catches up. In an `RtlScope` the
 * first page is the rightmost dot. */
export const PageDots: React.FunctionComponent<PageDotsProps> = ({
  count,
  index,
  onSelect,
  labels,
  dragging,
}) => {
  const rtl = useRtl()
  const resolve = useColorResolver()
  const reduceMotion = useReducedMotion()
  const slots = Array.from({length: count}, (_, i) => i)

  // Everything below is in physical x; RTL just maps page -> slot.
  const slotOf = (page: number) => (rtl ? count - 1 - page : page)
  const edges = (page: number) => {
    const center = slotOf(page) * SLOT + SLOT / 2
    return {left: center - ACTIVE_WIDTH / 2, right: center + ACTIVE_WIDTH / 2}
  }

  const initial = edges(index)
  const left = useRef(new Animated.Value(initial.left)).current
  const right = useRef(new Animated.Value(initial.right)).current
  const height = useRef(
    new Animated.Value(dragging ? DOT_FLAT : DOT),
  ).current
  const slot = useRef(slotOf(index))

  useEffect(() => {
    const next = slotOf(index)
    const target = edges(index)
    const movingRight = next > slot.current
    slot.current = next
    if (reduceMotion) {
      left.setValue(target.left)
      right.setValue(target.right)
      return
    }
    const spring = (
      value: Animated.Value,
      to: number,
      config: typeof LEAD,
      delay: number,
    ) =>
      Animated.sequence([
        Animated.delay(delay),
        Animated.spring(value, {
          toValue: to,
          ...config,
          useNativeDriver: false,
        }),
      ]).start()
    spring(movingRight ? right : left, movingRight ? target.right : target.left, LEAD, 0)
    spring(
      movingRight ? left : right,
      movingRight ? target.left : target.right,
      TRAIL,
      TRAIL_DELAY,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, count, rtl, reduceMotion])

  useEffect(() => {
    const to = dragging ? DOT_FLAT : DOT
    if (reduceMotion) height.setValue(to)
    else
      Animated.timing(height, {
        toValue: to,
        duration: 120,
        useNativeDriver: false,
      }).start()
  }, [dragging, reduceMotion, height])

  const width = Animated.subtract(right, left)

  return (
    <View
      accessibilityRole="tablist"
      style={styles.row}
    >
      {slots.map((slotIndex) => {
        const page = slotOf(slotIndex) // the mapping is its own inverse
        const selected = page === index
        return (
          <Pressable
            key={slotIndex}
            accessibilityRole="tab"
            accessibilityState={{selected}}
            accessibilityLabel={labels?.[page]}
            disabled={!onSelect}
            onPress={() => onSelect?.(page)}
            hitSlop={{left: 4, right: 4}}
            style={styles.slot}
          >
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: resolve(SemanticColor.TextPrimary),
                  opacity: selected ? 0 : INACTIVE_OPACITY,
                },
              ]}
            />
          </Pressable>
        )
      })}
      <Animated.View
        pointerEvents="none"
        style={[styles.worm, {left, width}]}
      >
        <Animated.View
          style={[
            styles.pill,
            {height, backgroundColor: resolve(SemanticColor.AccentPrimary)},
          ]}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  // Always laid out left to right: RTL is the page -> slot mapping, so the
  // worm's x coordinates and the dots share one frame.
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    height: TARGET_HEIGHT,
  },
  slot: {
    width: SLOT,
    height: TARGET_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {width: DOT, height: DOT, borderRadius: radius.xs},
  worm: {
    position: 'absolute',
    top: 0,
    height: TARGET_HEIGHT,
    justifyContent: 'center',
  },
  pill: {alignSelf: 'stretch', borderRadius: radius.xs},
})
