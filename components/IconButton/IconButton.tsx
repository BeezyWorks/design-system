import React from 'react'
import {Pressable} from 'react-native'
import {spacing, SpacingToken} from '../../spacing'
import {radius} from '../../radius'
import {useColors, SemanticColor} from '../../colors'
import {Icon, IconName} from '../Icon'

export interface IconButtonProps {
  name: IconName
  size?: number
  color?: SemanticColor
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
  color = SemanticColor.TextPrimary,
  padding = 'sm',
  disabled,
  onPress,
  accessibilityLabel,
  testID,
}) => {
  const colors = useColors()
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
        backgroundColor: pressed ? colors.backgroundColorDirty : 'transparent',
      })}
    >
      <Icon name={name} size={size} color={color} />
    </Pressable>
  )
}
