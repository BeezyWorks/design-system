import React, {createContext, useContext} from 'react'
import {Platform, StyleSheet, View, useWindowDimensions} from 'react-native'
import {Edge, SafeAreaView} from 'react-native-safe-area-context'
import {
  TAB_BAR_CONTENT_GAP,
  SIDE_NAV_CONTENT_GAP,
  useIsWideWebNav,
  useSideNavWidth,
  useTabBarHeight,
} from '../../layout'
import {SemanticColor} from '../../colors'
import {useColorResolver, ColorResolver} from '../../theme'
import {isFloatingTabBar} from '../TabBarBackground'

export interface ScreenProps {
  children?: React.ReactNode
  /** Skip the top safe-area inset — for the one screen so far that shows
   * a real native header (`headerShown: true`), which already reserves
   * that same notch/status-bar space itself; without this, the inset
   * would double up as a dead gap below the header. */
  hasNativeHeader?: boolean
  /** Caps the content column on every platform and centers it: `content`
   * for lists and menus, `reader` for a wider long-form reading column.
   * Unset, only web gets the `content` cap. */
  width?: 'content' | 'reader'
  /** A panel docked beside the content column, outside its width cap —
   * e.g. a `DetailOverlay` on a wide layout. */
  aside?: React.ReactNode
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
const MAX_READER_WIDTH = 860

/** The standard screen chrome: safe-area handling, the room the bottom tab
 * pill / side rail needs, and the web reading-width cap. Every top-level
 * screen renders this once as its outermost element. */
const allEdges: Edge[] = ['top', 'right', 'bottom', 'left']
const edgesWithoutTop: Edge[] = ['right', 'bottom', 'left']

export const Screen: React.FunctionComponent<ScreenProps> = ({
  children,
  hasNativeHeader,
  width,
  aside,
}) => {
  const resolve = useColorResolver()
  // Only set when this screen sits inside the tab navigator (bottom pill on
  // native/narrow web, side rail on wide web) — leaves the padding out for
  // screens pushed above the tabs (e.g. a full-screen reader).
  const tabBarHeight = useTabBarHeight()
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
  // Only the iOS floating pill overlaps content and needs this clearance —
  // the docked bar on Android/web already reserves its own space in the
  // tab navigator's layout, so adding this there just leaves a dead gap
  // above a bar that was never covering anything.
  const bottomInset =
    isFloatingTabBar && insideTabs ? tabBarHeight! + TAB_BAR_CONTENT_GAP : 0
  // The web anchor below is the full window height, but a docked bottom bar
  // (narrow web) takes its own row out of it — without subtracting that, the
  // screen's bottom is hidden behind the bar and the last item can't scroll
  // into view. The side rail and the iOS pill don't shorten the screen.
  const dockedBarHeight =
    isWeb && insideTabs && !isWideWeb && !isFloatingTabBar ? tabBarHeight! : 0
  const style = styleCreator(resolve, {
    paddingLeft:
      isWideWeb && insideTabs ? sideNavWidth + SIDE_NAV_CONTENT_GAP : 0,
    height: isWeb ? windowHeight - dockedBarHeight : undefined,
    maxWidth: width === 'reader' ? MAX_READER_WIDTH : MAX_CONTENT_WIDTH,
    capEverywhere: width !== undefined,
    hasAside: aside !== undefined,
  })
  // Web has no notch/home-indicator to avoid.
  const Container = isWeb ? View : SafeAreaView

  return (
    <Container
      style={style.base}
      edges={isWeb ? undefined : hasNativeHeader ? edgesWithoutTop : allEdges}
    >
      <View style={style.wrapper}>
        <View style={style.content}>
          <ScreenBottomInsetContext.Provider value={bottomInset}>
            {children}
          </ScreenBottomInsetContext.Provider>
        </View>
        {aside}
      </View>
    </Container>
  )
}

const styleCreator = (
  resolve: ColorResolver,
  padding: {
    paddingLeft: number
    height?: number
    maxWidth: number
    capEverywhere: boolean
    hasAside: boolean
  },
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
      backgroundColor: resolve(SemanticColor.SurfaceBackground),
      zIndex: 999,
    },
    wrapper: {
      backgroundColor: resolve(SemanticColor.SurfaceBackground),
      flex: 1,
      overflow: 'hidden',
      paddingLeft: padding.paddingLeft,
      ...(padding.hasAside && {flexDirection: 'row' as const}),
    },
    content: !(isWeb || padding.capEverywhere)
      ? {flex: 1}
      : padding.hasAside
        ? // In the row beside an aside: take the leftover width (flex), cap
          // it, and center it there with auto margins — `alignSelf` would
          // act on the row's vertical axis instead.
          {flex: 1, maxWidth: padding.maxWidth, marginHorizontal: 'auto'}
        : {
            flex: 1,
            width: '100%',
            maxWidth: padding.maxWidth,
            alignSelf: 'center',
          },
  })
