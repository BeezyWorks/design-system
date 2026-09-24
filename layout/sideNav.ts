import {Platform, useWindowDimensions} from 'react-native'
import {SIDE_NAV_BREAKPOINT, SIDE_NAV_WIDTH_EXPANDED} from './chrome'

// Only a wide-enough web viewport gets the persistent left rail — a narrow
// browser window (phone web) keeps the same floating bottom pill as native.
export const useIsWideWebNav = () => {
  const {width} = useWindowDimensions()
  return Platform.OS === 'web' && width >= SIDE_NAV_BREAKPOINT
}

// Space screens need to reserve for the rail — 0 whenever it isn't shown.
export const useSideNavWidth = () => {
  const isWide = useIsWideWebNav()
  return isWide ? SIDE_NAV_WIDTH_EXPANDED : 0
}
