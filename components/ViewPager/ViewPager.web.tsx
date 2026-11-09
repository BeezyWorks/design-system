import React, {useEffect, useRef, useState} from 'react'
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import {useRtl} from '../../layout'
import {ViewPagerProps} from './ViewPager'

export type {ViewPagerProps}

/** Web has no native pager view — a horizontally-paginated ScrollView
 * reproduces the same swipe behavior. Layout of the pager itself is the
 * caller's job via a wrapping `Stack`, same contract as native. In an
 * `RtlScope` the pages are laid out in reverse, so the first page is
 * rightmost; `page`/`onPageSelected` stay in page order either way. */
export const ViewPager: React.FunctionComponent<ViewPagerProps> = ({
  scrollEnabled = true,
  initialPage = 0,
  page,
  onPageSelected,
  onDraggingChange,
  onPageScroll,
  children,
}) => {
  const rtl = useRtl()
  const dragging = useRef(false)
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const setDragging = (next: boolean) => {
    if (settleTimer.current) clearTimeout(settleTimer.current)
    settleTimer.current = null
    if (dragging.current === next) return
    dragging.current = next
    onDraggingChange?.(next)
  }
  useEffect(
    () => () => {
      if (settleTimer.current) clearTimeout(settleTimer.current)
    },
    [],
  )
  const pages = React.Children.toArray(children)
  const count = pages.length
  const [width, setWidth] = useState(0)
  const scroll = useRef<ScrollView>(null)
  const current = useRef(initialPage)
  // Set while a `page` jump animates, so the pages it scrolls past aren't
  // reported as selected (which would pull `page` back mid-flight).
  const jumpTarget = useRef<number | null>(null)
  // Page index <-> horizontal slot (they differ only when right-to-left).
  const slotFor = (index: number) => (rtl ? count - 1 - index : index)

  // Width is 0 until the first layout, so the starting page can only be
  // scrolled to once it's known.
  useEffect(() => {
    if (width <= 0) return
    scroll.current?.scrollTo({
      x: slotFor(current.current) * width,
      animated: false,
    })
  }, [width])

  useEffect(() => {
    if (page === undefined || page === current.current || width <= 0) return
    current.current = page
    jumpTarget.current = page
    scroll.current?.scrollTo({x: slotFor(page) * width, animated: true})
  }, [page])

  const onScroll = ({
    nativeEvent: {contentOffset},
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (width <= 0) return
    if (onPageScroll) {
      // Logical page position as a float, then split into index + fraction.
      const slotFloat = contentOffset.x / width
      const logical = rtl ? count - 1 - slotFloat : slotFloat
      const position = Math.max(0, Math.min(count - 1, Math.floor(logical)))
      onPageScroll(position, Math.max(0, Math.min(1, logical - position)))
    }
    const slot = Math.round(contentOffset.x / width)
    const index = rtl ? count - 1 - slot : slot
    if (jumpTarget.current !== null) {
      if (index === jumpTarget.current) jumpTarget.current = null
      return
    }
    if (index === current.current || index < 0 || index >= count) return
    current.current = index
    onPageSelected?.(index)
  }

  const ordered = rtl ? [...pages].reverse() : pages

  return (
    <View
      style={styles.fill}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <ScrollView
        ref={scroll}
        style={styles.fill}
        // A horizontal ScrollView's content container only gets `minWidth:
        // '100%'` implicitly (so paging still works) — its *height* stays
        // shrink-to-fit unless set explicitly, so every page (and anything
        // inside relying on a real flex:1 chain, like a centered
        // `ScrollView`) would otherwise collapse to its own content height
        // instead of stretching to fill the pager.
        contentContainerStyle={styles.fillHeight}
        horizontal
        pagingEnabled
        scrollEnabled={scrollEnabled}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onScrollBeginDrag={() => setDragging(true)}
        // Releasing mid-page starts a momentum settle; a release exactly on a
        // page never does, so fall back to a short timer.
        onScrollEndDrag={() => {
          if (settleTimer.current) clearTimeout(settleTimer.current)
          settleTimer.current = setTimeout(() => setDragging(false), 200)
        }}
        onMomentumScrollBegin={() => {
          if (settleTimer.current) clearTimeout(settleTimer.current)
          settleTimer.current = null
        }}
        onMomentumScrollEnd={() => setDragging(false)}
        scrollEventThrottle={32}
      >
        {ordered.map((child, slot) => (
          <View key={slot} style={[styles.page, {width}]}>
            {child}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  // `minHeight: 0` lets flex children shrink below their content height
  // (flexbox's `min-height: auto` would otherwise grow the scroller to fit
  // its tallest page), so a page's own vertical scroller scrolls inside it.
  fill: {flex: 1, minHeight: 0},
  fillHeight: {height: '100%'},
  page: {height: '100%', minHeight: 0, overflow: 'hidden'},
})
