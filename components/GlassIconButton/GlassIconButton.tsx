import React from 'react'
import {Platform, Pressable, StyleSheet, View} from 'react-native'
import {GlassView, isLiquidGlassAvailable} from 'expo-glass-effect'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'
import {useShadow} from '../../shadows'
import {Icon, IconName} from '../Icon'

export interface GlassIconButtonProps {
  name: IconName
  onPress: () => void
  accessibilityLabel: string
  /** Drawn inside a JS layout (e.g. `Header`) rather than as a native nav
   * bar item: it always draws its own glass and adds no edge margin. */
  inline?: boolean
}

const buttonSize = 40
const iconSize = 20

/** A circular icon-only button — real interactive iOS Liquid Glass via
 * `expo-glass-effect` where the OS/device actually supports it, a plain
 * solid circular button everywhere else (Android, web, older iOS). By
 * default it's a native nav bar item (`headerLeft`/`headerRight`); pass
 * `inline` to place it in a JS layout. */
export const GlassIconButton: React.FunctionComponent<GlassIconButtonProps> = ({
  name,
  onPress,
  accessibilityLabel,
  inline = false,
}) => {
  const resolve = useColorResolver()
  const cardShadow = useShadow('card')
  const liquidGlass = isLiquidGlassAvailable()

  const button = (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      style={({pressed}) => [styles.pressable, pressed && styles.pressed]}
    >
      <Icon name={name} size={iconSize} color={SemanticColor.TextPrimary} />
    </Pressable>
  )

  // The iOS 26 nav bar already wraps each bar item in its own glass, so a
  // second glass here would show as a bubble inside a bubble.
  if (!inline && liquidGlass) return button

  const content = liquidGlass ? (
    <GlassView glassEffectStyle="regular" isInteractive style={styles.circle}>
      {button}
    </GlassView>
  ) : (
    <View
      style={[
        styles.circle,
        cardShadow,
        {backgroundColor: resolve(SemanticColor.SurfaceCard)},
      ]}
    >
      {button}
    </View>
  )

  // Native platforms get this edge spacing for free from the OS nav bar's
  // own layout (UIKit/the Android toolbar reserve it around header items).
  // Expo Router's web header is plain JS layout with no such built-in
  // inset, so without this the button sits flush against the screen edge.
  return Platform.OS === 'web' && !inline ? (
    <View style={styles.webMargin}>{content}</View>
  ) : (
    content
  )
}

export type GlassBackButtonProps = Omit<GlassIconButtonProps, 'name'>

/** The app-wide back button: a `GlassIconButton` with the platform's back
 * glyph — a chevron on iOS, an arrow elsewhere. */
export const GlassBackButton: React.FunctionComponent<GlassBackButtonProps> = (
  props,
) => (
  <GlassIconButton
    name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}
    {...props}
  />
)

const styles = StyleSheet.create({
  circle: {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    overflow: 'hidden',
  },
  pressable: {
    width: buttonSize,
    height: buttonSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {opacity: 0.6},
  webMargin: {marginHorizontal: 8},
})
