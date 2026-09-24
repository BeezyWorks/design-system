import React from 'react'
import {Pressable, ActivityIndicator} from 'react-native'
import {spacing} from '../../spacing'
import {radius} from '../../radius'
import {SemanticColor} from '../../colors'
import {useColorResolver} from '../../theme'
import {Text} from '../Text'
import {Icon, IconName} from '../Icon'

export type ButtonVariant =
  'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

const variantColors: Record<
  ButtonVariant,
  {background: SemanticColor; label: SemanticColor; border?: SemanticColor}
> = {
  primary: {
    background: SemanticColor.AccentPrimary,
    label: SemanticColor.TextInverse,
  },
  secondary: {
    background: SemanticColor.SurfaceCard,
    label: SemanticColor.TextAccent,
  },
  ghost: {
    background: SemanticColor.SurfaceBackground,
    label: SemanticColor.TextAccent,
  },
  destructive: {
    background: SemanticColor.SurfaceDanger,
    label: SemanticColor.TextInverse,
  },
  // Outline: no fill, just a border — distinct from `secondary`, which is
  // a solid (if muted) filled button.
  outline: {
    background: SemanticColor.SurfaceBackground,
    label: SemanticColor.TextAccent,
    border: SemanticColor.BorderDefault,
  },
}

const sizePadding: Record<ButtonSize, {vertical: number; horizontal: number}> =
  {
    sm: {vertical: spacing.xs, horizontal: spacing.sm},
    md: {vertical: spacing.sm, horizontal: spacing.md},
    lg: {vertical: spacing.md, horizontal: spacing.lg},
  }

export interface ButtonProps {
  title: string
  variant?: ButtonVariant
  size?: ButtonSize
  /** An icon beside the label. */
  icon?: IconName
  /** Where the icon sits in *reading* order — before the label (default)
   * or after it (a "next" chevron). */
  iconPosition?: 'start' | 'end'
  /** A right-to-left (Hebrew) label: lays the row out right to left, so
   * "start" is the right side. */
  rtl?: boolean
  /** Stretch across the parent instead of sizing to the label. */
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  onPress?: () => void
  testID?: string
  accessibilityLabel?: string
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'start',
  rtl,
  fullWidth,
  loading,
  disabled,
  onPress,
  testID,
  accessibilityLabel,
}) => {
  const resolve = useColorResolver()
  const variantStyle = variantColors[variant]
  const padding = sizePadding[size]
  const isDisabled = !!(disabled || loading)

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{disabled: isDisabled, busy: !!loading}}
      disabled={isDisabled}
      onPress={onPress}
      testID={testID}
      style={({pressed}) => ({
        backgroundColor: resolve(variantStyle.background),
        borderRadius: radius.md,
        borderWidth: variantStyle.border ? 1 : 0,
        borderColor: variantStyle.border
          ? resolve(variantStyle.border)
          : undefined,
        flexDirection: rtl ? 'row-reverse' : 'row',
        ...(fullWidth && {alignSelf: 'stretch' as const}),
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.md,
        opacity: disabled ? 0.4 : pressed ? 0.7 : 1,
        paddingVertical: padding.vertical,
        paddingHorizontal: padding.horizontal,
      })}
    >
      {loading ? (
        <ActivityIndicator color={resolve(variantStyle.label)} />
      ) : (
        <>
          {!!icon && iconPosition === 'start' && (
            <Icon name={icon} size={18} color={variantStyle.label} />
          )}
          <Text variant="headline" color={variantStyle.label} rtl={rtl}>
            {title}
          </Text>
          {!!icon && iconPosition === 'end' && (
            <Icon name={icon} size={18} color={variantStyle.label} />
          )}
        </>
      )}
    </Pressable>
  )
}
