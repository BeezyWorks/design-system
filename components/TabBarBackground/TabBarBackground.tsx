import React from 'react'
import {StyleSheet} from 'react-native'
import {BlurView} from 'expo-blur'
import {radius} from '../../radius'

export interface TabBarBackgroundProps {
  dark?: boolean
}

/** The floating tab-bar pill's blurred backdrop. Wraps `expo-blur`'s
 * `BlurView` (a native component that requires its own `style` prop) so the
 * navigator itself never has to build one. */
export const TabBarBackground: React.FunctionComponent<
  TabBarBackgroundProps
> = ({dark}) => (
  <BlurView
    tint={dark ? 'systemChromeMaterialDark' : 'systemChromeMaterialLight'}
    intensity={80}
    style={[StyleSheet.absoluteFill, blurStyle]}
  />
)

const blurStyle = {borderRadius: radius.full, overflow: 'hidden' as const}
