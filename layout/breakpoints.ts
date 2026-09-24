import {useWindowDimensions} from 'react-native'

// Platform-agnostic — an iPad in landscape (or a wide browser window) both
// qualify. Below this, screens keep their phone layout.
export const WIDE_LAYOUT_BREAKPOINT = 980

export const useIsWideLayout = () => {
  const {width} = useWindowDimensions()
  return width >= WIDE_LAYOUT_BREAKPOINT
}
