import React from 'react'
import {SemanticColor} from '../../colors'
import {Icon, IconName} from '../Icon'

export interface TabBarIconProps {
  name: IconName
  focused: boolean
}

/** The icon for one destination in the app's primary navigation, tinted by
 * the active/inactive semantic tokens. Shared by the native/narrow-web
 * bottom tab pill (`app/(tabs)/_layout.tsx`, via the `tabBarIcon` render prop)
 * and the wide-web side rail (`sideNav.widget.tsx`), which both render the
 * same set of destinations. */
export const TabBarIcon: React.FunctionComponent<TabBarIconProps> = ({
  name,
  focused,
}) => (
  <Icon
    name={name}
    color={
      focused ? SemanticColor.AccentTabActive : SemanticColor.TextTabInactive
    }
  />
)
