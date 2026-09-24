export const TAB_BAR_HEIGHT = 56
export const TAB_BAR_MARGIN = 16
export const TAB_BAR_RADIUS = TAB_BAR_HEIGHT / 2

// Extra breathing room to leave below screen content so it never sits behind
// the floating glass tab bar (the bar's own measured height plus this is
// added as bottom padding by consumers of BottomTabBarHeightContext).
export const TAB_BAR_CONTENT_GAP = TAB_BAR_MARGIN * 2

// Wide web only: the bottom pill is replaced by a persistent left side
// rail once there's enough room for it — narrow web (a phone browser) and
// native both keep the floating bottom pill.
export const SIDE_NAV_WIDTH_EXPANDED = 232
// Icon-only, when the app lets the user collapse the rail.
export const SIDE_NAV_WIDTH_COLLAPSED = 76
export const SIDE_NAV_BREAKPOINT = 860
export const SIDE_NAV_CONTENT_GAP = 24
