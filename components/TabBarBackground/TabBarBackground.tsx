import React from 'react'
import {StyleSheet} from 'react-native'
import {GlassView} from 'expo-glass-effect'
import {radius} from '../../radius'

export interface TabBarBackgroundProps {
  dark?: boolean
}

/** The floating tab-bar pill's backdrop — real iOS Liquid Glass via
 * `expo-glass-effect`'s native `GlassView`. Only ever mounted on iOS (see
 * `useFloatingTabBarStyle`, which renders a plain docked bar with no
 * backdrop at all on other platforms) — `GlassView` itself degrades to an
 * unstyled `View` off iOS, so this is never reached elsewhere regardless. */
export const TabBarBackground: React.FunctionComponent<
  TabBarBackgroundProps
> = ({dark}) => (
  <GlassView
    glassEffectStyle="regular"
    colorScheme={dark ? 'dark' : 'light'}
    style={[StyleSheet.absoluteFill, glassStyle]}
  />
)

const glassStyle = {borderRadius: radius.full, overflow: 'hidden' as const}
