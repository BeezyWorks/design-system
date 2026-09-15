import React, {forwardRef} from 'react'
import {HeaderedScrollView} from 'widgets/header/headeredScrollView'
import type {HeaderProps} from 'widgets/header/header'
import {spacing} from '../../spacing'
import {layout} from '../../layout'

export interface ReaderScrollProps {
  headerProps: HeaderProps
  children?: React.ReactNode
}

/** The scrollable reading area shared by every book-reader screen (Haftara,
 * Parsha, Pirkei Avos, the plain Tanach viewer): the collapsible header
 * widget, padded to keep content clear of the floating header above and the
 * `BookNavigator` bar below. This is the one place those screens' identical
 * `{padding: 16, paddingVertical: headerHeightMax}` container style used to
 * be hand-rolled — now expressed with `@design` tokens instead. */
export const ReaderScroll = forwardRef<HeaderedScrollView, ReaderScrollProps>(
  ({headerProps, children}, ref) => (
    <HeaderedScrollView
      ref={ref}
      headerProps={headerProps}
      contentContainerStyle={{
        padding: spacing.md,
        paddingVertical: layout.headerHeight,
      }}
    >
      {children}
    </HeaderedScrollView>
  ),
)
