import React, {useEffect, useRef} from 'react'
import {StyleSheet, View} from 'react-native'
import PagerView from 'react-native-pager-view'
import {useRtl} from '../../layout'

export interface ViewPagerProps {
  scrollEnabled?: boolean
  initialPage?: number
  /** Jumps to this page when it changes (e.g. a tapped `PageDots` dot).
   * Swipes still move freely; pair with `onPageSelected` to keep it in
   * step. */
  page?: number
  /** The page a swipe (or a `page` jump) settled on. */
  onPageSelected?: (page: number) => void
  children: React.ReactNode
}

/** A horizontally-swipeable page stack — layout of the pager itself
 * (sizing, background, padding) is the caller's job via a wrapping `Stack`;
 * this only owns the swipe behavior. In an `RtlScope` it pages
 * right-to-left: the first page is rightmost, the next one comes in from
 * the left. */
export const ViewPager: React.FunctionComponent<ViewPagerProps> = ({
  scrollEnabled = true,
  initialPage = 0,
  page,
  onPageSelected,
  children,
}) => {
  const rtl = useRtl()
  const pager = useRef<PagerView>(null)
  const current = useRef(initialPage)

  useEffect(() => {
    if (page === undefined || page === current.current) return
    current.current = page
    pager.current?.setPage(page)
  }, [page])

  return (
    <View style={styles.fill}>
      <PagerView
        ref={pager}
        style={styles.fill}
        scrollEnabled={scrollEnabled}
        initialPage={initialPage}
        layoutDirection={rtl ? 'rtl' : 'ltr'}
        onPageSelected={({nativeEvent: {position}}) => {
          current.current = position
          onPageSelected?.(position)
        }}
      >
        {children}
      </PagerView>
    </View>
  )
}

const styles = StyleSheet.create({
  fill: {flex: 1},
})
