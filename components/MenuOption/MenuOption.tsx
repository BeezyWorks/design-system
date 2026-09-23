import React from 'react'
import {SemanticColor} from '../../colors'
import {Stack} from '../Stack'
import {Text} from '../Text'
import {Touchable} from '../Touchable'

export interface MenuOptionProps {
  label: string
  selected?: boolean
  onPress: () => void
  /** Omits the bottom divider — set on the last row in a list. */
  isLast?: boolean
}

/** A single selectable row in the Zman Picker sheet — same Hebrew-first
 * (`rowReverse`) convention and hairline dividers as `MenuItemRow`, but
 * selectable: a selected row gets a flat `tint` fill and switches its
 * label to the bold/accent face instead of a chevron. */
export const MenuOption: React.FunctionComponent<MenuOptionProps> = ({
  label,
  selected,
  onPress,
  isLast,
}) => (
  <Touchable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityState={{selected: !!selected}}
  >
    <Stack
      direction="rowReverse"
      align="center"
      height={48}
      paddingHorizontal="md"
      background={selected ? SemanticColor.SurfaceSelected : undefined}
      borderBottomWidth={isLast ? 'none' : 1}
      borderColor={SemanticColor.BorderDefault}
    >
      <Text variant={selected ? 'menuOptionSelected' : 'menuOption'}>
        {label}
      </Text>
    </Stack>
  </Touchable>
)
