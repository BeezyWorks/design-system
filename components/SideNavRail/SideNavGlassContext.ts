import {createContext} from 'react'

/** Whether the enclosing `SideNavRail` is frosted glass over a photo, so a
 * `SideNavItem` can set its focused state apart from the photo. */
export const SideNavGlassContext = createContext(false)
