import React from 'react'
import {SemanticColor} from '../../colors'
import {Pressable, StyleSheet} from 'react-native'
import {BlurView} from 'expo-blur'
import {Stack} from '../Stack'
import {Icon} from '../Icon'

export interface SideNavRailProps {
  children?: React.ReactNode
  /** Fixed rail width — a layout constant owned by `layout/chrome.ts`,
   * not part of the spacing scale (see that file's own comment). Use
   * `useSideNavWidth()` so it tracks the collapsed state. */
  width: number
  blurTint: 'systemChromeMaterialDark' | 'systemChromeMaterialLight'
  /** With `onToggleCollapsed`, shows a collapse/expand control at the
   * bottom of the rail. Pass the same state to `SideNavItem`s and provide it
   * through `SideNavCollapsedContext`. */
  collapsed?: boolean
  onToggleCollapsed?: () => void
}

/** The wide-web side rail's outer chrome: a fixed-width panel pinned to the
 * left edge with a translucent blur background and a hairline border on its
 * trailing edge. The app fills this with a column of `SideNavItem`s.
 * `BlurView`'s `style` prop is the library's own required contract (like
 * `Icon`'s color prop), not a style escape hatch. */
export const SideNavRail: React.FunctionComponent<SideNavRailProps> = ({
  children,
  width,
  blurTint,
  collapsed,
  onToggleCollapsed,
}) => (
  <Stack
    position="absolute"
    top="none"
    bottom="none"
    left="none"
    width={width}
    zIndex={10}
  >
    <BlurView tint={blurTint} intensity={80} style={StyleSheet.absoluteFill} />
    <Stack
      position="absolute"
      top="none"
      bottom="none"
      right="none"
      width={StyleSheet.hairlineWidth}
      background={SemanticColor.BorderDefault}
    />
    <Stack
      grow
      paddingTop="lg"
      paddingBottom="md"
      paddingHorizontal="sm"
      gap="xs"
    >
      {children}
      {!!onToggleCollapsed && (
        <>
          <Stack grow />
          <Pressable
            onPress={onToggleCollapsed}
            accessibilityRole="button"
            accessibilityLabel={
              collapsed ? 'Expand navigation' : 'Collapse navigation'
            }
          >
            {({pressed}) => (
              <Stack
                direction="row"
                justify={collapsed ? 'center' : 'end'}
                padding="sm"
                opacity={pressed ? 0.6 : undefined}
              >
                <Icon
                  name={collapsed ? 'chevrons-right' : 'chevrons-left'}
                  size={18}
                  color={SemanticColor.TextSecondary}
                />
              </Stack>
            )}
          </Pressable>
        </>
      )}
    </Stack>
  </Stack>
)
