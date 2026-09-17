import React from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {GlassView, isLiquidGlassAvailable} from 'expo-glass-effect'
import {useColors} from '../../colors'
import {shadows} from '../../shadows'
import {Icon, IconName} from '../Icon'

export interface GlassIconButtonProps {
  name: IconName
  onPress: () => void
  accessibilityLabel: string
}

const buttonSize = 40
const iconSize = 20

/** A circular icon-only button — real interactive iOS Liquid Glass via
 * `expo-glass-effect` where the OS/device actually supports it, a plain
 * solid circular button everywhere else (Android, web, older iOS). Used
 * for the Notifications nav bar's back/add buttons. */
export const GlassIconButton: React.FunctionComponent<GlassIconButtonProps> = ({
  name,
  onPress,
  accessibilityLabel,
}) => {
  const colors = useColors()

  const button = (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      style={({pressed}) => [styles.pressable, pressed && styles.pressed]}
    >
      <Icon name={name} size={iconSize} tone="ink" />
    </Pressable>
  )

  if (isLiquidGlassAvailable()) {
    return (
      <GlassView glassEffectStyle="regular" isInteractive style={styles.circle}>
        {button}
      </GlassView>
    )
  }

  return (
    <View
      style={[
        styles.circle,
        styles.fallback,
        {backgroundColor: colors.surfaceCard},
      ]}
    >
      {button}
    </View>
  )
}

const styles = StyleSheet.create({
  circle: {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    overflow: 'hidden',
  },
  fallback: {...shadows.card},
  pressable: {
    width: buttonSize,
    height: buttonSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {opacity: 0.6},
})
