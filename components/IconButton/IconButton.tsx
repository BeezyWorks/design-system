import React from 'react'
import {Pressable} from 'react-native'
import {spacing, SpacingToken} from '../../spacing'
import {radius} from '../../radius'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'
import {Icon, IconName} from '../Icon'

/** `plain` — just the glyph; `filled` — on a quiet round chip (steppers);
 * `accent` — on a solid brand circle (a primary inline action). */
export type IconButtonVariant = 'plain' | 'filled' | 'accent'

const variantBackground: Record<IconButtonVariant, SemanticColor | undefined> =
  {
    plain: undefined,
    filled: SemanticColor.SurfaceSelected,
    accent: SemanticColor.AccentPrimary,
  }

export interface IconButtonProps {
  name: IconName
  size?: number
  /** Default `TextPrimary` (`TextInverse` on the `accent` variant). */
  color?: SemanticColor
  variant?: IconButtonVariant
  padding?: SpacingToken
  disabled?: boolean
  onPress?: () => void
  accessibilityLabel: string
  testID?: string
}

/** A tappable icon with pressed feedback and a semantic hit target — use
 * instead of wrapping `Icon` in a bare `TouchableOpacity`. */
export const IconButton: React.FunctionComponent<IconButtonProps> = ({
  name,
  size = 24,
  variant = 'plain',
  color = variant === 'accent'
    ? SemanticColor.TextInverse
    : SemanticColor.TextPrimary,
  padding = 'sm',
  disabled,
  onPress,
  accessibilityLabel,
  testID,
}) => {
  const resolve = useColorResolver()
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{disabled: !!disabled}}
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      hitSlop={spacing.sm}
      style={({pressed}) => ({
        padding: spacing[padding],
        borderRadius: radius.full,
        opacity: disabled ? 0.4 : pressed ? 0.6 : 1,
        backgroundColor: variantBackground[variant]
          ? resolve(variantBackground[variant])
          : pressed
            ? resolve(SemanticColor.SurfaceCard)
            : 'transparent',
      })}
    >
      <Icon name={name} size={size} color={color} />
    </Pressable>
  )
}
