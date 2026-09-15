import React from 'react'
import {Pressable, ActivityIndicator} from 'react-native'
import {spacing} from '../../spacing'
import {radius} from '../../radius'
import {useColors, Colors} from '../../colors'
import {Text} from '../Text'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg'

const variantTone: Record<
  ButtonVariant,
  {background: keyof Colors; label: keyof Colors}
> = {
  primary: {background: 'primaryColor', label: 'headerTextColor'},
  secondary: {background: 'backgroundColorDirty', label: 'primaryTextColor'},
  ghost: {background: 'backgroundColor', label: 'primaryColor'},
  destructive: {background: 'danger', label: 'headerTextColor'},
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
  loading,
  disabled,
  onPress,
  testID,
  accessibilityLabel,
}) => {
  const colors = useColors()
  const tone = variantTone[variant]
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
        backgroundColor: colors[tone.background],
        borderRadius: radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.4 : pressed ? 0.7 : 1,
        paddingVertical: padding.vertical,
        paddingHorizontal: padding.horizontal,
      })}
    >
      {loading ? (
        <ActivityIndicator color={colors[tone.label]} />
      ) : (
        <Text variant="headline" tone={tone.label}>
          {title}
        </Text>
      )}
    </Pressable>
  )
}
