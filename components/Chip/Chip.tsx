import React from 'react'
import {Pressable} from 'react-native'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
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
}) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={label}
    accessibilityState={{selected: !!selected}}
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
        opacity={pressed ? 0.7 : undefined}
      >
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
