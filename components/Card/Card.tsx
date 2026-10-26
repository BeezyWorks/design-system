import React from 'react'
import {Pressable, PressableProps} from 'react-native'
import {Stack, StackProps} from '../Stack'
import {StateLayer, usePressFeedback} from '../Touchable/pressFeedback'
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
  /** Makes the whole card one tap target — washed under a pointer and
   * while pressed, when it also dips. */
  onPress?: () => void
  /** Read by screen readers for a tappable card. */
  accessibilityLabel?: string
  accessibilityState?: PressableProps['accessibilityState']
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
  accessibilityState,
  children,
  ...stackProps
}) => {
  const {hovered, pressableProps} = usePressFeedback()
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
    >
      <StateLayer visible={hovered || pressed} radius={radius} />
      {children}
    </Stack>
  )
  if (!onPress) return card()
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
      {...pressableProps}
    >
      {({pressed}) => card(pressed)}
    </Pressable>
  )
}
