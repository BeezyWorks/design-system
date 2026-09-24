import React, {useContext} from 'react'
import {Platform, useWindowDimensions} from 'react-native'
import {
  SIDE_NAV_BREAKPOINT,
  SIDE_NAV_WIDTH_COLLAPSED,
  SIDE_NAV_WIDTH_EXPANDED,
} from './chrome'

// Only a wide-enough web viewport gets the persistent left rail — a narrow
// browser window (phone web) keeps the same floating bottom pill as native.
export const useIsWideWebNav = () => {
  const {width} = useWindowDimensions()
  return Platform.OS === 'web' && width >= SIDE_NAV_BREAKPOINT
}

/** Whether the app has collapsed the side rail to icons. The app owns (and
 * persists) the choice and provides it here, around its tabs, so `Screen`
 * reserves the right width. */
export const SideNavCollapsedContext = React.createContext(false)

// Space screens need to reserve for the rail — 0 whenever it isn't shown.
export const useSideNavWidth = () => {
  const isWide = useIsWideWebNav()
  const collapsed = useContext(SideNavCollapsedContext)
  if (!isWide) return 0
  return collapsed ? SIDE_NAV_WIDTH_COLLAPSED : SIDE_NAV_WIDTH_EXPANDED
}
