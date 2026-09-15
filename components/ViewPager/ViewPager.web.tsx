import React, {useState} from 'react'
import {NativeSyntheticEvent, ScrollView, StyleSheet, View} from 'react-native'
import {withOpacity} from '../../colors'
import {ViewPagerProps} from './ViewPager'

export type {ViewPagerProps}

/** Web has no native pager view — a horizontally-paginated ScrollView
 * reproduces the same swipe/indicator behavior. Layout of the pager itself
 * is the caller's job via a wrapping `Stack`, same contract as native. */
export const ViewPager: React.FunctionComponent<ViewPagerProps> = ({
  scrollEnabled = true,
  initialPage = 0,
  showPageIndicator,
  children,
}) => {
  const pages = React.Children.toArray(children)
  const [page, setPage] = useState(initialPage)
  const [width, setWidth] = useState(0)

  const onMomentumScrollEnd = (
    e: NativeSyntheticEvent<{contentOffset: {x: number}}>,
  ) => {
    if (!width) return
    setPage(Math.round(e.nativeEvent.contentOffset.x / width))
  }

  return (
    <View
      style={styles.fill}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <ScrollView
        horizontal
        pagingEnabled
        scrollEnabled={scrollEnabled}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        contentOffset={{x: initialPage * width, y: 0}}
      >
        {pages.map((child, index) => (
          <View key={index} style={{width}}>
            {child}
          </View>
        ))}
      </ScrollView>
      {showPageIndicator && (
        <View style={styles.indicatorRow}>
          {pages.map((_, index) => (
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
