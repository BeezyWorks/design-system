import React, {useCallback, useImperativeHandle, useRef} from 'react'
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native'
import {Header, HeaderProps} from '../Header'

interface Props extends ScrollViewProps {
  headerProps: HeaderProps
}

export interface HeaderedScrollView {
  scrollTo: (offset: number, animate?: boolean) => void
  showHeader: (animated?: boolean) => void
  hideHeader: (animated?: boolean) => void
  scrollToTop: () => void
  getCurrentOffsetY: () => number
}

// Web gets a plain, always-visible header instead of the native
// collapse-on-scroll behavior (a mobile gesture affordance that reads as
// broken/disorienting with a mouse wheel, and whose underlying animated
// scroll listener is unreliable under react-native-web). A real static
// header above a normal ScrollView is both more predictable and more
// expected on desktop, so `showHeader`/`hideHeader` are no-ops here.
//
// Above the wide-reader breakpoint (see readerBreakpoint.ts, shared with
// native so an iPad gets the same treatment) the header itself stays in
// place — its title/zmanim/settings buttons switch to anchored popovers
// instead of bottom sheets, handled entirely inside Header. Section
// navigation is popover-only (via the title button); there's no separate
// persistent rail.
export const HeaderedScrollView = React.forwardRef<HeaderedScrollView, Props>(
  (
    {
      headerProps,
      onScroll: _onScroll,
      contentContainerStyle,
      style,
      ...restProps
    }: Props,
    ref,
  ) => {
    const innerRef = useRef<ScrollView>(null)
    const scrollValueY = useRef(0)
    // `flex: 1` alone doesn't reliably reach a bounded pixel height here —
    // an ancestor React Navigation owns (its web screen wrapper) sizes
    // itself with `min-height`, not `height`, so once ANYTHING below it
    // re-renders the whole chain can collapse back to content-sized and
    // silently stop scrolling. Anchoring directly to the window size
    // sidesteps that ancestor chain instead of depending on it — but note
    // `flex: 1` (== flexBasis: 0%) on the SAME element overrides an
    // explicit `height` for main-axis sizing, silently discarding it, so
    // this box gets a bare height with no competing flex-basis.
    const {height: windowHeight} = useWindowDimensions()

    const onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void =
      useCallback(
        (event) => {
          if (_onScroll) _onScroll(event)
          scrollValueY.current = event.nativeEvent.contentOffset.y
        },
        [_onScroll],
      )

    useImperativeHandle(ref, () => {
      return {
        scrollTo: (offset: number, animate?: boolean) => {
          innerRef.current?.scrollTo({y: offset, animated: !!animate})
        },
        showHeader: () => {},
        hideHeader: () => {},
        scrollToTop: () => {
          innerRef.current?.scrollTo({y: 0, animated: false})
        },
        getCurrentOffsetY: () => scrollValueY.current,
      }
    })

    return (
      <View style={[styles.base, {height: windowHeight}]}>
        <Header {...headerProps} />
        <ScrollView
          bounces={false}
          {...restProps}
          ref={innerRef}
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={[styles.scroll, style]}
          // The native layout pads the top of the content to clear the
          // floating collapsible header — here the header is a normal
          // sibling above the scroll body, so that offset would just be
          // a gap. paddingTop:0 wins over an inherited paddingVertical
          // regardless of array order (Yoga resolves the more specific
          // edge), so this only ever removes the top half of it.
          contentContainerStyle={[contentContainerStyle, styles.noTopOffset]}
        />
      </View>
    )
  },
)

const styles = StyleSheet.create({
  base: {width: '100%'},
  scroll: {flex: 1},
  noTopOffset: {paddingTop: 0},
})
