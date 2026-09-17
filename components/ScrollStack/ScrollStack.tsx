import React from 'react'
import {ScrollView, ScrollViewProps} from 'react-native'
import {spacing, SpacingToken} from '../../spacing'
import {useScreenBottomInset} from '../Screen'

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
 * contentContainerStyle={styles...}`. Automatically adds
 * `useScreenBottomInset()` on top of its own bottom padding, so content
 * scrolls all the way to the screen's real bottom — behind the floating
 * tab pill — rather than stopping short of it with a dead gap. */
export const ScrollStack: React.FunctionComponent<ScrollStackProps> = ({
  children,
  padding,
  gap,
  grow,
  ...scrollProps
}) => {
  const bottomInset = useScreenBottomInset()
  const basePadding = padding ? spacing[padding] : 0

  return (
    <ScrollView
      {...scrollProps}
      contentContainerStyle={{
        padding: padding ? spacing[padding] : undefined,
        paddingBottom: basePadding + bottomInset || undefined,
        gap: gap ? spacing[gap] : undefined,
        flexGrow: grow ? 1 : undefined,
      }}
    >
      {children}
    </ScrollView>
  )
}
