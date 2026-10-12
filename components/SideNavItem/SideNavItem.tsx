import React, {useContext} from 'react'
import {SemanticColor} from '../../colors'
import {Pressable} from 'react-native'
import {ThemeScope} from '../../theme'
import {GlassSurface} from '../GlassSurface'
import {SideNavGlassContext} from '../SideNavRail/SideNavGlassContext'
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

const HEIGHT = 48

/** One row of the wide-web side rail — an icon + label with focused/pressed
 * feedback, standing in for the floating bottom tab pill at that
 * breakpoint. In a glass rail (over a photo) the focused row is a pill of
 * light frosted glass, as a home screen's current glass tile, since the
 * accent tint alone washes out over the photo. */
export const SideNavItem: React.FunctionComponent<SideNavItemProps> = ({
  icon,
  label,
  focused,
  onPress,
  collapsed,
}) => {
  const overGlass = useContext(SideNavGlassContext)
  const content = (
    <>
      {icon}
      {!collapsed && (
        <Text
          variant="headline"
          color={focused ? SemanticColor.TextAccent : SemanticColor.TextPrimary}
          numberOfLines={1}
        >
          {label}
        </Text>
      )}
    </>
  )
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{selected: focused}}
    >
      {({pressed}) =>
        focused && overGlass ? (
          <Stack opacity={pressed ? 0.7 : 1}>
            <ThemeScope mode="light">
              <GlassSurface
                direction="row"
                align="center"
                justify={collapsed ? 'center' : undefined}
                gap="md"
                paddingHorizontal={collapsed ? 'sm' : 'md'}
                height={HEIGHT}
                radius="md"
              >
                {content}
              </GlassSurface>
            </ThemeScope>
          </Stack>
        ) : (
          <Stack
            direction="row"
            align="center"
            justify={collapsed ? 'center' : undefined}
            gap="md"
            paddingHorizontal={collapsed ? 'sm' : 'md'}
            height={HEIGHT}
            radius="md"
            background={focused ? SemanticColor.AccentTint : undefined}
            opacity={pressed ? 0.7 : 1}
          >
            {content}
          </Stack>
        )
      }
    </Pressable>
  )
}
