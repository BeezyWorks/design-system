import React from 'react'
import {View} from 'react-native'

export interface PagerFrameProps {
  children?: React.ReactNode
  /** Bottom clearance for the floating tab pill/safe-area below the
   * phone swiper's `ViewPager` — a numeric, device/tab-bar-height-dependent
   * inset, so it can't come from the spacing token scale the way `Stack`'s
   * padding props do. */
  paddingBottom?: number
}

/** Fills its parent (`ViewPager` now expects layout to be handled by its
 * wrapper, not a `style` prop of its own) while carrying that one numeric
 * inset. */
export const PagerFrame: React.FunctionComponent<PagerFrameProps> = ({
  children,
  paddingBottom,
}) => <View style={{flex: 1, paddingBottom}}>{children}</View>
