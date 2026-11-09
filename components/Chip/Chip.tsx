import React from 'react'
import {Pressable} from 'react-native'
import {SemanticColor} from '../../colors'
import {Icon} from '../Icon'
import {Stack} from '../Stack'
import {StateLayer, usePressFeedback} from '../Touchable/pressFeedback'
import {Text} from '../Text'

export interface ChipProps {
  label: string
  selected?: boolean
  onPress: () => void
  /** Shows a leading check while selected — for multi-select filters, where
   * the fill alone is easy to miss. */
  check?: boolean
}

/** A selectable pill — a filter, or one of a strip of pages to jump
 * between. Selected fills with the brand, like the other "on" states;
 * `check` adds a leading tick for multi-select. */
export const Chip: React.FunctionComponent<ChipProps> = ({
  label,
  selected,
  onPress,
  check,
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
          direction="row"
          align="center"
          gap="xs"
          borderWidth={1}
          borderColor={
            selected ? SemanticColor.AccentPrimary : SemanticColor.BorderDefault
          }
          background={
            selected ? SemanticColor.AccentPrimary : SemanticColor.SurfaceCard
          }
        >
          <StateLayer visible={hovered || pressed} radius="full" />
          {check && selected ? (
            <Icon name="check" size={14} color={SemanticColor.TextInverse} />
          ) : null}
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
