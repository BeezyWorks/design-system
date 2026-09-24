import React, {useContext} from 'react'

/** The height of the tab bar a screen sits inside, or `undefined` when the
 * screen isn't inside a tab bar. The design system doesn't know about any
 * navigator — whoever renders the tabs (the app) provides this, so `Screen`
 * can reserve room for the bar. */
export const TabBarHeightContext = React.createContext<number | undefined>(
  undefined,
)

export const useTabBarHeight = () => useContext(TabBarHeightContext)
