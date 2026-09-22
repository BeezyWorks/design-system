import React from 'react'
import {StyleSheet, View} from 'react-native'
import PagerView from 'react-native-pager-view'

export interface ViewPagerProps {
  scrollEnabled?: boolean
  initialPage?: number
  children: React.ReactNode
}

/** A horizontally-swipeable page stack — layout of the pager itself
 * (sizing, background, padding) is the caller's job via a wrapping `Stack`;
 * this only owns the swipe behavior. */
export const ViewPager: React.FunctionComponent<ViewPagerProps> = ({
  scrollEnabled = true,
  initialPage = 0,
  children,
}) => {
  return (
    <View style={styles.fill}>
      <PagerView
        style={styles.fill}
        scrollEnabled={scrollEnabled}
        initialPage={initialPage}
      >
        {children}
      </PagerView>
    </View>
  )
}

const styles = StyleSheet.create({
  fill: {flex: 1},
})
