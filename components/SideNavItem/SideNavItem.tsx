import React from 'react'
import {SemanticColor} from '../../colors'
import {Pressable} from 'react-native'
import {Stack} from '../Stack'
import {Text} from '../Text'

export interface SideNavItemProps {
  /** The already-rendered tab icon — typically a `TabBarIcon` returned by
   * calling `options.tabBarIcon({focused, color, size})`, React
   * Navigation's own render-prop contract, so the side rail stays driven by
   * the same per-route config as the native tab bar. */
  icon: React.ReactNode
  label: string
  focused: boolean
  onPress: () => void
  /** Icon only — the rail is collapsed. The label stays the accessible
   * name. */
  collapsed?: boolean
}

/** One row of the wide-web side rail — an icon + label with focused/pressed
 * feedback, standing in for the floating bottom tab pill at that
 * breakpoint. */
export const SideNavItem: React.FunctionComponent<SideNavItemProps> = ({
  icon,
  label,
  focused,
  onPress,
  collapsed,
}) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={label}
    accessibilityState={{selected: focused}}
  >
    {({pressed}) => (
      <Stack
        direction="row"
        align="center"
        justify={collapsed ? 'center' : undefined}
        gap="md"
        paddingHorizontal={collapsed ? 'sm' : 'md'}
        height={48}
        radius="md"
        background={focused ? SemanticColor.AccentTint : undefined}
        opacity={pressed ? 0.7 : 1}
      >
        {icon}
        {!collapsed && (
          <Text
            variant="headline"
            color={
              focused ? SemanticColor.TextAccent : SemanticColor.TextPrimary
            }
            numberOfLines={1}
          >
            {label}
          </Text>
        )}
      </Stack>
    )}
  </Pressable>
)
