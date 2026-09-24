import React from 'react'
import {Pressable, StyleSheet} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'
import {spacing, SpacingToken} from '../../spacing'
import {radius} from '../../radius'
import {Stack} from '../Stack'

export interface GradientCardProps {
  children?: React.ReactNode
  padding?: SpacingToken
  onPress?: () => void
  accessibilityLabel?: string
}

/** The brand's hero surface: a card filled with the brand gradient (deep →
 * strong) instead of a flat surface — for the one thing a screen most wants
 * you to tap (e.g. "continue where you left off"). Text on it uses
 * `TextOnAccent`; chips on it, `Badge tone="onAccent"`. The gradient's
 * `colors`/`style` are the library's own contract, not a style escape
 * hatch — both are derived from tokens here. */
export const GradientCard: React.FunctionComponent<GradientCardProps> = ({
  children,
  padding = 'lg',
  onPress,
  accessibilityLabel,
}) => {
  const resolve = useColorResolver()
  const card = (pressed = false) => (
    <Stack radius="lg" shadow="raised" opacity={pressed ? 0.85 : undefined}>
      <LinearGradient
        colors={[
          resolve(SemanticColor.AccentPrimaryDeep),
          resolve(SemanticColor.AccentPrimaryStrong),
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[styles.gradient, {padding: spacing[padding]}]}
      >
        {children}
      </LinearGradient>
    </Stack>
  )
  if (!onPress) return card()
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      {({pressed}) => card(pressed)}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  gradient: {borderRadius: radius.lg},
})
