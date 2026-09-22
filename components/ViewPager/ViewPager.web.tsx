import React, {useState} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {ViewPagerProps} from './ViewPager'

export type {ViewPagerProps}

/** Web has no native pager view — a horizontally-paginated ScrollView
 * reproduces the same swipe behavior. Layout of the pager itself is the
 * caller's job via a wrapping `Stack`, same contract as native. */
export const ViewPager: React.FunctionComponent<ViewPagerProps> = ({
  scrollEnabled = true,
  initialPage = 0,
  children,
}) => {
  const pages = React.Children.toArray(children)
  const [width, setWidth] = useState(0)

  return (
    <View
      style={styles.fill}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <ScrollView
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
        contentOffset={{x: initialPage * width, y: 0}}
      >
        {pages.map((child, index) => (
          <View key={index} style={{width, height: '100%'}}>
            {child}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  fill: {flex: 1},
  fillHeight: {height: '100%'},
})
