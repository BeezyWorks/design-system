import React from 'react'
import {StyleSheet} from 'react-native'
import {BlurView} from 'expo-blur'
import {Stack} from '../Stack'

export interface SideNavRailProps {
  children?: React.ReactNode
  /** Fixed rail width — a layout constant owned by `navigation/tabBar.constants.ts`,
   * not part of the spacing scale (see that file's own comment). */
  width: number
  blurTint: 'systemChromeMaterialDark' | 'systemChromeMaterialLight'
}

/** The wide-web side rail's outer chrome: a fixed-width panel pinned to the
 * left edge with a translucent blur background and a hairline border on its
 * trailing edge. `sideNav.widget.tsx` fills this with a column of
 * `SideNavItem`s. `BlurView`'s `style` prop is the library's own required
 * contract (like `Icon`'s color prop), not a style escape hatch. */
export const SideNavRail: React.FunctionComponent<SideNavRailProps> = ({
  children,
  width,
  blurTint,
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
      background="border"
    />
    <Stack paddingTop="lg" paddingHorizontal="sm" gap="xs">
      {children}
    </Stack>
  </Stack>
)
