import React, {createContext, useContext} from 'react'
import {Platform, StyleSheet, View, useWindowDimensions} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {BottomTabBarHeightContext} from 'expo-router/js-tabs'
import {
  TAB_BAR_CONTENT_GAP,
  SIDE_NAV_CONTENT_GAP,
} from 'navigation/tabBar.constants'
import {useIsWideWebNav, useSideNavWidth} from 'navigation/sideNav.hook'
import {useColors, Colors} from '../../colors'

export interface ScreenProps {
  children?: React.ReactNode
}

const ScreenBottomInsetContext = createContext(0)

/** How much extra bottom padding a screen's own scrollable content needs
 * so its last item can clear the floating tab pill — `Screen` provides
 * this via context instead of clipping its own content area short, so
 * content can scroll to be visible *behind* the translucent pill (as it
 * should, being translucent) rather than stopping dead above it with a
 * dead gap always showing beneath the last item. `ScrollStack` already
 * applies this automatically; reach for it directly only if a screen uses
 * some other scrollable primitive. */
export const useScreenBottomInset = () => useContext(ScreenBottomInsetContext)

const isWeb = Platform.OS === 'web'
// Readable line-length cap for list/menu screens once the web side rail
// frees up a lot of extra horizontal space.
const MAX_CONTENT_WIDTH = 720

/** The standard screen chrome: safe-area handling, the room the bottom tab
 * pill / side rail needs, and the web reading-width cap. Every top-level
 * screen renders this once as its outermost element. */
export const Screen: React.FunctionComponent<ScreenProps> = ({children}) => {
  const colors = useColors()
  // Only set when this screen sits inside the tab navigator (bottom pill on
  // native/narrow web, side rail on wide web) — leaves the padding out for
  // screens pushed above the tabs (e.g. the full-screen siddur reader).
  const tabBarHeight = useContext(BottomTabBarHeightContext)
  const insideTabs = tabBarHeight !== undefined
  const isWideWeb = useIsWideWebNav()
  const sideNavWidth = useSideNavWidth()
  // React Navigation's web screen wrapper sizes itself with `min-height`,
  // not `height` — so once our content is taller than the viewport it just
  // grows to fit instead of handing us a bounded box to scroll within, and
  // the whole document scrolls (dragging the header/tab chrome along with
  // it) instead of an internal ScrollView. Anchoring to the real window
  // height here (rather than `flex: 1`) gives everything below a concrete
  // pixel box again, so `overflow: hidden`/a ScrollView's own scrolling can
  // actually clip against it.
  const {height: windowHeight} = useWindowDimensions()
  // Not applied to `wrapper` below on purpose — see `useScreenBottomInset`.
  const bottomInset =
    !isWideWeb && insideTabs ? tabBarHeight! + TAB_BAR_CONTENT_GAP : 0
  const style = styleCreator(colors, {
    paddingLeft:
      isWideWeb && insideTabs ? sideNavWidth + SIDE_NAV_CONTENT_GAP : 0,
    height: isWeb ? windowHeight : undefined,
  })
  // Web has no notch/home-indicator to avoid.
  const Container = isWeb ? View : SafeAreaView

  return (
    <Container style={style.base}>
      <View style={style.wrapper}>
        <View style={style.content}>
          <ScreenBottomInsetContext.Provider value={bottomInset}>
            {children}
          </ScreenBottomInsetContext.Provider>
        </View>
      </View>
    </Container>
  )
}

const styleCreator = (
  colors: Colors,
  padding: {paddingLeft: number; height?: number},
) =>
  StyleSheet.create({
    base: {
      alignSelf: 'stretch',
      // `flex: 1` (== flexBasis: 0%) on the same element overrides an
      // explicit `height` for main-axis sizing and silently discards it —
      // so on web (where `height` is set below, anchored to the window)
      // this can't also carry `flex: 1`.
      flex: padding.height === undefined ? 1 : undefined,
      height: padding.height,
      // `surface/background`, matching `wrapper` below — both need to be
      // the same color (not `backgroundColorDirty`/`surfaceCard`) so the
      // safe-area inset (notch/home-indicator strip, painted by this outer
      // view) doesn't show as a visibly different color from the content.
      backgroundColor: colors.backgroundColor,
      zIndex: 999,
    },
    wrapper: {
      backgroundColor: colors.backgroundColor,
      flex: 1,
      overflow: 'hidden',
      paddingLeft: padding.paddingLeft,
    },
    content: isWeb
      ? {
          flex: 1,
          width: '100%',
          maxWidth: MAX_CONTENT_WIDTH,
          alignSelf: 'center',
        }
      : {flex: 1},
  })
