import React from 'react'
import {Pressable} from 'react-native'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {StateLayer, usePressFeedback} from '../Touchable/pressFeedback'
import {Text} from '../Text'

export interface ChipProps {
  label: string
  selected?: boolean
  onPress: () => void
}

/** A selectable pill — a filter, or one of a strip of pages to jump
 * between. Selected fills with the brand, like the other "on" states. */
export const Chip: React.FunctionComponent<ChipProps> = ({
  label,
  selected,
  onPress,
}) => {
  const {hovered, pressableProps} = usePressFeedback()
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{selected: !!selected}}
      {...pressableProps}
    >
      {({pressed}) => (
        <Stack
          radius="full"
          paddingHorizontal="md"
          paddingVertical="xs"
          borderWidth={1}
          borderColor={
            selected ? SemanticColor.AccentPrimary : SemanticColor.BorderDefault
          }
          background={
            selected ? SemanticColor.AccentPrimary : SemanticColor.SurfaceCard
          }
        >
          <StateLayer visible={hovered || pressed} radius="full" />
          <Text
            variant="label"
            color={
              selected ? SemanticColor.TextInverse : SemanticColor.TextSecondary
            }
          >
            {label}
          </Text>
        </Stack>
      )}
    </Pressable>
  )
}
