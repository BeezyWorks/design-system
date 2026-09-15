import React, {useCallback, useImperativeHandle, useRef} from 'react'
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  ScrollViewProps,
} from 'react-native'
import {CollapsibleHeaderScrollView} from 'react-native-collapsible-header-views'
import {layout} from '../../layout'
import {Header, HeaderProps} from '../Header'

interface Props extends ScrollViewProps {
  headerProps: HeaderProps
}

export interface HeaderedScrollView {
  scrollTo: (offset: number, animate?: boolean) => void
  showHeader: (animated?: boolean) => void
  hideHeader: (animated?: boolean) => void
  scrollToTop: () => void
  getCurrentOffsetY: () => number
}

export const HeaderedScrollView = React.forwardRef<HeaderedScrollView, Props>(
  ({headerProps, onScroll: _onScroll, ...restProps}: Props, ref) => {
    const innerRef = useRef<CollapsibleHeaderScrollView>(null)
    const scrollValueY = useRef(0)

    const onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void =
      useCallback(
        (event) => {
          if (_onScroll) _onScroll(event)
          scrollValueY.current = event.nativeEvent.contentOffset.y
        },
        [_onScroll],
      )

    useImperativeHandle(ref, () => {
      return {
        scrollTo: (offset: number, animate?: boolean) => {
          const scrollView = innerRef.current?.animatedComponent() as ScrollView
          if (scrollView) {
            scrollView.scrollTo({y: offset, animated: !!animate})
          }
        },
        showHeader: (animated?: boolean) =>
          innerRef.current?.showHeader({animated: !!animated}),
        hideHeader: (animated?: boolean) =>
          innerRef.current?.hideHeader({animated: !!animated}),
        scrollToTop: () => {
          const scrollView = innerRef.current?.animatedComponent() as ScrollView
          if (scrollView) {
            scrollView.scrollTo({y: 0, animated: false})
          }
          innerRef.current?.showHeader({animated: false})
        },
        getCurrentOffsetY: () => scrollValueY.current,
      }
    })

    return (
      <CollapsibleHeaderScrollView
        bounces={false}
        {...restProps}
        ref={innerRef}
        onScroll={onScroll}
        CollapsibleHeaderComponent={<Header {...headerProps} />}
        headerHeight={layout.headerHeight}
      />
    )
  },
)
