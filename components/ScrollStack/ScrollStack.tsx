import React from 'react'
import {ScrollView, ScrollViewProps} from 'react-native'
import {spacing, SpacingToken} from '../../spacing'

export interface ScrollStackProps extends Pick<
  ScrollViewProps,
  | 'horizontal'
  | 'bounces'
  | 'overScrollMode'
  | 'showsVerticalScrollIndicator'
  | 'showsHorizontalScrollIndicator'
  | 'testID'
  | 'onScroll'
  | 'scrollEventThrottle'
  | 'keyboardShouldPersistTaps'
> {
  children?: React.ReactNode
  padding?: SpacingToken
  gap?: SpacingToken
  /** Grows the scroll content to fill the viewport even when short. */
  grow?: boolean
}

/** The scrollable-column primitive — replaces `ScrollView
 * contentContainerStyle={styles...}`. */
export const ScrollStack: React.FunctionComponent<ScrollStackProps> = ({
  children,
  padding,
  gap,
  grow,
  ...scrollProps
}) => (
  <ScrollView
    {...scrollProps}
    contentContainerStyle={{
      padding: padding ? spacing[padding] : undefined,
      gap: gap ? spacing[gap] : undefined,
      flexGrow: grow ? 1 : undefined,
    }}
  >
    {children}
  </ScrollView>
)
