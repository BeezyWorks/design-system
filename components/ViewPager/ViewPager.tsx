import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import PagerView from 'react-native-pager-view'
import {withOpacity} from '../../colors'

export interface ViewPagerProps {
  scrollEnabled?: boolean
  initialPage?: number
  showPageIndicator?: boolean
  children: React.ReactNode
}

/** A horizontally-swipeable page stack with an optional dot indicator —
 * layout of the pager itself (sizing, background, padding) is the caller's
 * job via a wrapping `Stack`; this only owns the swipe/indicator behavior. */
export const ViewPager: React.FunctionComponent<ViewPagerProps> = ({
  scrollEnabled = true,
  initialPage = 0,
  showPageIndicator,
  children,
}) => {
  const pageCount = React.Children.count(children)
  const [page, setPage] = useState(initialPage)

  return (
    <View style={styles.fill}>
      <PagerView
        style={styles.fill}
        scrollEnabled={scrollEnabled}
        initialPage={initialPage}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >
        {children}
      </PagerView>
      {showPageIndicator && (
        <View style={styles.indicatorRow}>
          {Array.from({length: pageCount}).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === page ? styles.activeDot : undefined,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  fill: {flex: 1},
  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
    backgroundColor: withOpacity('#000000', 0.2),
  },
  activeDot: {
    backgroundColor: withOpacity('#000000', 0.6),
  },
})
