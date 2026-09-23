import {Platform, StyleSheet, ViewStyle} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'
import {radius} from '../../radius'
import {useShadow} from '../../shadows'
import {TAB_BAR_HEIGHT, TAB_BAR_MARGIN} from 'navigation/tabBar.constants'

/** The floating, glass tab-bar pill is an iOS design (Liquid Glass has no
 * equivalent on Android/web) — this is the one place that decides the tab
 * bar's actual frame, so `app/(tabs)/_layout.tsx` never computes raw style
 * values itself, only passes this through to `screenOptions.tabBarStyle`.
 * Non-iOS gets a conventional docked, edge-to-edge bar instead of a shrunk
 * approximation of the pill. */
export const useFloatingTabBarStyle = (): ViewStyle => {
  const resolve = useColorResolver()
  const insets = useSafeAreaInsets()
  const floatingShadow = useShadow('floating')

  if (Platform.OS !== 'ios') {
    return {
      backgroundColor: resolve(SemanticColor.SurfaceCard),
    }
  }

  return {
    position: 'absolute',
    // `left`/`right` fight this RTL app's own left/right remapping inside
    // react-navigation's bottom-tabs — `marginHorizontal` sidesteps it and
    // is direction-agnostic anyway, since both sides use the same value.
    marginHorizontal: TAB_BAR_MARGIN,
    bottom: insets.bottom + TAB_BAR_MARGIN / 2,
    height: TAB_BAR_HEIGHT,
    borderRadius: radius.full,
    borderTopWidth: 0,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: resolve(SemanticColor.BorderStrong),
    backgroundColor: 'transparent',
    ...floatingShadow,
  }
}

/** Whether the current platform gets the floating glass pill at all — used
 * to decide whether to mount `TabBarBackground` (`tabBarBackground`) too,
 * since a non-iOS docked bar has no backdrop of its own. */
export const isFloatingTabBar = Platform.OS === 'ios'
