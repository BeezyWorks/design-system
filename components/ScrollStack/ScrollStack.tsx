import React, {useRef} from 'react'
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
  /** A horizontal strip laid out right to left (its content a
   * `direction="rowReverse"` Stack): opens scrolled to the right edge, where
   * the first item is, instead of the left, where the last one is. */
  rtl?: boolean
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
  rtl,
  ...scrollProps
}) => {
  const scrollRef = useRef<ScrollView>(null)
  const didStartAtEnd = useRef(false)
  // A horizontal strip sits inside the page; only the page's own vertical
  // scroller needs to clear the tab bar.
  const screenInset = useScreenBottomInset()
  const bottomInset = scrollProps.horizontal ? 0 : screenInset
  const basePadding = padding ? spacing[padding] : 0

  return (
    <ScrollView
      ref={scrollRef}
      {...scrollProps}
      onContentSizeChange={
        rtl && scrollProps.horizontal
          ? () => {
              if (didStartAtEnd.current) return
              didStartAtEnd.current = true
              scrollRef.current?.scrollToEnd({animated: false})
            }
          : undefined
      }
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
