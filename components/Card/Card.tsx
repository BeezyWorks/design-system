import React from 'react'
import {Pressable} from 'react-native'
import {Stack, StackProps} from '../Stack'
import {SemanticColor} from '../../colors'

export interface CardProps extends Omit<
  StackProps,
  'shadow' | 'radius' | 'background' | 'padding' | 'borderWidth' | 'borderColor'
> {
  padding?: StackProps['padding']
  radius?: StackProps['radius']
  background?: StackProps['background']
  shadow?: StackProps['shadow']
  borderWidth?: StackProps['borderWidth']
  borderColor?: StackProps['borderColor']
  /** Makes the whole card one tap target (dims while pressed). */
  onPress?: () => void
  /** Read by screen readers for a tappable card. */
  accessibilityLabel?: string
}

/** The one raised-surface primitive every card in the app is built from —
 * menu sections and settings sections both use this
 * directly rather than hand-rolling their own background/border/radius,
 * so the two stay visually identical by construction, not by convention. */
export const Card: React.FunctionComponent<CardProps> = ({
  padding,
  paddingVertical = 20,
  paddingHorizontal = 22,
  radius = 'lg',
  background = SemanticColor.SurfaceCard,
  shadow = 'card',
  borderWidth = 1,
  borderColor = SemanticColor.BorderDefault,
  onPress,
  accessibilityLabel,
  ...stackProps
}) => {
  const card = (pressed = false) => (
    <Stack
      padding={padding}
      paddingVertical={padding === undefined ? paddingVertical : undefined}
      paddingHorizontal={padding === undefined ? paddingHorizontal : undefined}
      radius={radius}
      background={background}
      shadow={shadow}
      borderWidth={borderWidth}
      borderColor={borderColor}
      {...stackProps}
      opacity={pressed ? 0.7 : stackProps.opacity}
    />
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
